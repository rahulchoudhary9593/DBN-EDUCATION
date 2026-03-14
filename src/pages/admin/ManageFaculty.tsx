import React, { useState, useEffect, useRef } from 'react';
import { Plus, Users, Trash2, X, Upload, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FacultyItem {
  id: number;
  name: string;
  department: string;
  designation: string;
  institution: string;
  imageUrl: string;
  createdAt: string;
}

export default function ManageFaculty() {
  const [items, setItems] = useState<FacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    institution: 'School'
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/public/faculty');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      
      if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
        alert('Only JPG, PNG, and WEBP formats are supported.');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingId && !selectedFile) {
      alert('Please select a photo to upload.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('department', formData.department);
    data.append('designation', formData.designation);
    data.append('institution', formData.institution);
    
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      const url = editingId 
        ? `/api/v1/admin/faculty/${editingId}`
        : '/api/v1/admin/faculty';
        
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: data
      });

      if (response.ok) {
        const result = await response.json();
        if (editingId) {
          setItems(items.map(item => item.id === editingId ? result : item));
        } else {
          setItems([result, ...items]);
        }
        closeModal();
      } else {
        alert(`Failed to ${editingId ? 'update' : 'add'} faculty member`);
      }
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert('Error saving faculty member');
    }
  };

  const handleEdit = (item: FacultyItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      department: item.department,
      designation: item.designation,
      institution: item.institution
    });
    setPreviewUrl(item.imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', department: '', designation: '', institution: 'School' });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        const response = await fetch(`/api/v1/admin/faculty/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setItems(items.filter(i => i.id !== id));
        } else {
          alert('Failed to delete faculty member');
        }
      } catch (error) {
        console.error('Error deleting faculty:', error);
        alert('Error deleting faculty member');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Faculty</h1>
            <p className="text-sm text-slate-500 font-light mt-1">Add and organize faculty members</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-900/20 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Add Faculty
        </button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Users className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium">No faculty members found</p>
            <p className="text-sm mt-1">Click "Add Faculty" to add teachers to the directory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white hover:shadow-md transition-all">
                <div className="aspect-[3/4] w-full relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/40 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 truncate">{item.name}</h3>
                  <p className="text-sm text-blue-600 font-medium truncate">{item.designation}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate">{item.department}</span>
                    <span className="px-2 py-1 bg-slate-100 rounded-md font-medium">{item.institution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
                aria-hidden="true" 
                onClick={closeModal}
              ></motion.div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-100"
              >
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-6 pt-6 pb-6">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-xl font-bold text-slate-900 font-serif" id="modal-title">
                        {editingId ? 'Edit Faculty Member' : 'Add Faculty Member'}
                      </h3>
                      <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Photo</label>
                        <div 
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-slate-50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="space-y-1 text-center">
                            {previewUrl ? (
                              <div className="relative">
                                <img src={previewUrl} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-full shadow-md" />
                                <div className="mt-3 text-sm text-blue-600 font-medium">Click to change photo</div>
                              </div>
                            ) : (
                              <>
                                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                <div className="flex text-sm text-slate-600 justify-center">
                                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a photo</span>
                                  </span>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</p>
                              </>
                            )}
                          </div>
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange} 
                          accept="image/jpeg, image/png, image/webp"
                          className="hidden" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            required 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                            placeholder="e.g., Dr. Jane Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="designation" className="block text-sm font-semibold text-slate-700 mb-1">Designation</label>
                          <input 
                            type="text" 
                            id="designation" 
                            required 
                            value={formData.designation} 
                            onChange={(e) => setFormData({...formData, designation: e.target.value})} 
                            className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                            placeholder="e.g., Principal, Teacher"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-1">Department/Subject</label>
                          <input 
                            type="text" 
                            id="department" 
                            required 
                            value={formData.department} 
                            onChange={(e) => setFormData({...formData, department: e.target.value})} 
                            className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                            placeholder="e.g., Mathematics, Science"
                          />
                        </div>
                        <div>
                          <label htmlFor="institution" className="block text-sm font-semibold text-slate-700 mb-1">Institution</label>
                          <select 
                            id="institution" 
                            value={formData.institution} 
                            onChange={(e) => setFormData({...formData, institution: e.target.value})} 
                            className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white"
                          >
                            <option value="School">School</option>
                            <option value="College">College</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 border-t border-slate-100">
                    <button 
                      type="button" 
                      onClick={closeModal} 
                      className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-slate-300 shadow-sm px-5 py-2.5 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-transparent shadow-sm px-5 py-2.5 bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      {editingId ? 'Save Changes' : 'Add Faculty'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}