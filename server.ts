import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and WEBP images are allowed!'));
    }
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// SQLite Connection
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const db = new Database(path.join(dbDir, 'database.sqlite'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    targetInstitution TEXT,
    publishDate DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT,
    parentName TEXT,
    phone TEXT,
    institution TEXT,
    programOrClass TEXT,
    status TEXT DEFAULT 'New',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    location TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  DROP TABLE IF EXISTS downloads;
  CREATE TABLE IF NOT EXISTS downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    fileUrl TEXT,
    fileSize TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS faculty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    department TEXT,
    designation TEXT,
    institution TEXT,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// --- API Routes ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// --- Public API Endpoints ---

app.get('/api/v1/public/notices', (req, res) => {
  try {
    const { institution, startDate, endDate } = req.query;
    
    let query = 'SELECT id as _id, title, content, targetInstitution, publishDate FROM notices WHERE 1=1';
    const params: any[] = [];

    if (institution) {
      query += ' AND targetInstitution = ?';
      params.push(institution);
    }

    if (startDate) {
      query += ' AND date(publishDate) >= date(?)';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND date(publishDate) <= date(?)';
      params.push(endDate);
    }

    query += ' ORDER BY publishDate DESC';

    const stmt = db.prepare(query);
    const notices = stmt.all(...params);
    
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

app.post('/api/v1/public/inquiries', (req, res) => {
  try {
    const { studentName, parentName, phone, institution, programOrClass } = req.body;
    const stmt = db.prepare(`
      INSERT INTO inquiries (studentName, parentName, phone, institution, programOrClass)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(studentName, parentName, phone, institution, programOrClass);
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.get('/api/v1/public/gallery', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id as _id, title, category, imageUrl, createdAt FROM gallery ORDER BY createdAt DESC');
    res.json(stmt.all());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.get('/api/v1/public/events', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id as _id, title, description, date, location, createdAt FROM events ORDER BY date ASC');
    res.json(stmt.all());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get('/api/v1/public/downloads', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id as _id, title, description, fileUrl, fileSize, createdAt FROM downloads ORDER BY createdAt DESC');
    res.json(stmt.all());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

app.get('/api/v1/public/faculty', (req, res) => {
  try {
    const { institution } = req.query;
    let query = 'SELECT id as _id, name, department, designation, institution, imageUrl, createdAt FROM faculty';
    const params: any[] = [];
    
    if (institution) {
      query += ' WHERE institution = ?';
      params.push(institution);
    }
    
    query += ' ORDER BY name ASC';
    const stmt = db.prepare(query);
    res.json(stmt.all(...params));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculty' });
  }
});

// --- Admin API Endpoints ---

app.get('/api/v1/admin/inquiries', (req, res) => {
  try {
    const stmt = db.prepare('SELECT id as _id, studentName, parentName, phone, institution, programOrClass, status, createdAt FROM inquiries ORDER BY createdAt DESC');
    const inquiries = stmt.all();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.get('/api/v1/admin/stats', (req, res) => {
  try {
    const totalInquiries = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number };
    const totalNotices = db.prepare('SELECT COUNT(*) as count FROM notices').get() as { count: number };
    res.json({ totalInquiries: totalInquiries.count, totalNotices: totalNotices.count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Admin Notices
app.post('/api/v1/admin/notices', (req, res) => {
  try {
    const { title, content, targetInstitution } = req.body;
    const stmt = db.prepare('INSERT INTO notices (title, content, targetInstitution) VALUES (?, ?, ?)');
    const result = stmt.run(title, content, targetInstitution);
    const newNotice = db.prepare('SELECT id as _id, title, content, targetInstitution, publishDate FROM notices WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notice' });
  }
});

app.delete('/api/v1/admin/notices/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM notices WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notice' });
  }
});

// Admin Gallery
app.post('/api/v1/admin/gallery', upload.single('image'), (req, res) => {
  try {
    const { title, category } = req.body;
    let imageUrl = req.body.imageUrl;
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const stmt = db.prepare('INSERT INTO gallery (title, category, imageUrl) VALUES (?, ?, ?)');
    const result = stmt.run(title, category, imageUrl);
    const newGallery = db.prepare('SELECT id as _id, title, category, imageUrl, createdAt FROM gallery WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

app.delete('/api/v1/admin/gallery/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM gallery WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Admin Events
app.post('/api/v1/admin/events', (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const stmt = db.prepare('INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)');
    const result = stmt.run(title, description, date, location);
    const newEvent = db.prepare('SELECT id as _id, title, description, date, location, createdAt FROM events WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.delete('/api/v1/admin/events/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM events WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Admin Downloads
app.post('/api/v1/admin/downloads', upload.single('file'), (req, res) => {
  try {
    const { title, description } = req.body;
    let fileUrl = req.body.fileUrl;
    let fileSize = req.body.fileSize;

    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      fileSize = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;
    }

    const stmt = db.prepare('INSERT INTO downloads (title, description, fileUrl, fileSize) VALUES (?, ?, ?, ?)');
    const result = stmt.run(title, description, fileUrl, fileSize);
    const newDownload = db.prepare('SELECT id as _id, title, description, fileUrl, fileSize, createdAt FROM downloads WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newDownload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add download' });
  }
});

app.delete('/api/v1/admin/downloads/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM downloads WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Download deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete download' });
  }
});

// Admin Faculty
app.post('/api/v1/admin/faculty', upload.single('image'), (req, res) => {
  try {
    const { name, department, designation, institution } = req.body;
    let imageUrl = req.body.imageUrl || '';
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const stmt = db.prepare('INSERT INTO faculty (name, department, designation, institution, imageUrl) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(name, department, designation, institution, imageUrl);
    const newFaculty = db.prepare('SELECT id as _id, name, department, designation, institution, imageUrl, createdAt FROM faculty WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add faculty' });
  }
});

app.put('/api/v1/admin/faculty/:id', upload.single('image'), (req, res) => {
  try {
    const { name, department, designation, institution } = req.body;
    let imageUrl = req.body.imageUrl;
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    let stmt;
    if (imageUrl) {
      stmt = db.prepare('UPDATE faculty SET name = ?, department = ?, designation = ?, institution = ?, imageUrl = ? WHERE id = ?');
      stmt.run(name, department, designation, institution, imageUrl, req.params.id);
    } else {
      stmt = db.prepare('UPDATE faculty SET name = ?, department = ?, designation = ?, institution = ? WHERE id = ?');
      stmt.run(name, department, designation, institution, req.params.id);
    }
    
    const updatedFaculty = db.prepare('SELECT id as _id, name, department, designation, institution, imageUrl, createdAt FROM faculty WHERE id = ?').get(req.params.id);
    res.json(updatedFaculty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update faculty' });
  }
});

app.delete('/api/v1/admin/faculty/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM faculty WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete faculty' });
  }
});

// Vite Middleware for Development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
