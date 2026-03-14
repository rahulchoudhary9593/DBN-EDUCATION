/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Institutions from './pages/public/Institutions';
import Notices from './pages/public/Notices';
import Gallery from './pages/public/Gallery';
import Events from './pages/public/Events';
import Admissions from './pages/public/Admissions';
import Downloads from './pages/public/Downloads';
import Contact from './pages/public/Contact';
import Faculty from './pages/public/Faculty';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageNotices from './pages/admin/ManageNotices';
import ManageInquiries from './pages/admin/ManageInquiries';
import ManageGallery from './pages/admin/ManageGallery';
import ManageEvents from './pages/admin/ManageEvents';
import ManageDownloads from './pages/admin/ManageDownloads';
import ManageFaculty from './pages/admin/ManageFaculty';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="institutions" element={<Institutions />} />
          <Route path="notices" element={<Notices />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="events" element={<Events />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="notices" element={<ManageNotices />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="downloads" element={<ManageDownloads />} />
          <Route path="faculty" element={<ManageFaculty />} />
        </Route>
      </Routes>
    </Router>
  );
}
