import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FileText, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notice {
  _id: string;
  title: string;
  content: string;
  targetInstitution: string;
  publishDate: string;
}

export default function ManageNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', targetInstitution: 'Global' });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/public/notices');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newNotice = await response.json();
        setNotices([newNotice, ...notices]);
        setIsModalOpen(false);
        setFormData({ title: '', content: '', targetInstitution: 'Global' });
      } else {
        alert('Failed to create notice');
      }
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('Error creating notice');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const response = await fetch(`/api/v1/admin/notices/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setNotices(notices.filter(n => n._id !== id));
        } else {
          alert('Failed to delete notice');
        }
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Error deleting notice');
      }
    }
  };

  const getInstitutionColor = (inst: string) => {
    switch(inst) {
      case 'College': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EnglishSchool': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'HindiSchool': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Bell className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Notices</h1>
            <p className="text-sm text-slate-500 font-light mt-1">Publish and manage announcements</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-900/20 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Create Notice
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title & Content</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Target Audience</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Publish Date</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex justify-center items-center flex-col space-y-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                      <p className="text-sm font-medium">Loading notices...</p>
                    </div>
                  </td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="bg-slate-100 p-4 rounded-full">
                        <FileText className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium">No notices found. Create one to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="text-sm font-bold text-slate-900 mb-1">{notice.title}</div>
                      <div className="text-sm text-slate-500 truncate max-w-md">{notice.content}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md border ${getInstitutionColor(notice.targetInstitution)}`}>
                        {notice.targetInstitution}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {new Date(notice.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(notice._id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create Notice Modal */}
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
                onClick={() => setIsModalOpen(false)}
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
                        Create New Notice
                      </h3>
                      <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">Notice Title</label>
                        <input 
                          type="text" 
                          id="title" 
                          required 
                          value={formData.title} 
                          onChange={(e) => setFormData({...formData, title: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                          placeholder="e.g., Annual Sports Day Announcement"
                        />
                      </div>
                      <div>
                        <label htmlFor="targetInstitution" className="block text-sm font-semibold text-slate-700 mb-1">Target Audience</label>
                        <select 
                          id="targetInstitution" 
                          value={formData.targetInstitution} 
                          onChange={(e) => setFormData({...formData, targetInstitution: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white"
                        >
                          <option value="Global">Global (All Institutions)</option>
                          <option value="College">Degree College</option>
                          <option value="EnglishSchool">English Medium School</option>
                          <option value="HindiSchool">Hindi Medium School</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-1">Notice Content</label>
                        <textarea 
                          id="content" 
                          rows={5} 
                          required 
                          value={formData.content} 
                          onChange={(e) => setFormData({...formData, content: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white resize-none"
                          placeholder="Enter the full details of the notice here..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 border-t border-slate-100">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)} 
                      className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-slate-300 shadow-sm px-5 py-2.5 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-transparent shadow-sm px-5 py-2.5 bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      Publish Notice
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
