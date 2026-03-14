import React, { useState, useEffect, useRef } from 'react';
import { Plus, FileText, Trash2, Download, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DownloadItem {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  createdAt: string;
}

export default function ManageDownloads() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/public/downloads');
      if (response.ok) {
        const data = await response.json();
        setDownloads(data);
      }
    } catch (error) {
      console.error('Error fetching downloads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file', selectedFile);

    try {
      const response = await fetch('/api/v1/admin/downloads', {
        method: 'POST',
        body: data
      });
      if (response.ok) {
        const newDownload = await response.json();
        setDownloads([newDownload, ...downloads]);
        closeModal();
      } else {
        alert('Failed to add download');
      }
    } catch (error) {
      console.error('Error adding download:', error);
      alert('Error adding download');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', description: '' });
    setSelectedFile(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this download?')) {
      try {
        const response = await fetch(`/api/v1/admin/downloads/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setDownloads(downloads.filter(d => d._id !== id));
        } else {
          alert('Failed to delete download');
        }
      } catch (error) {
        console.error('Error deleting download:', error);
        alert('Error deleting download');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-rose-100 p-2 rounded-lg">
            <Download className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Downloads</h1>
            <p className="text-sm text-slate-500 font-light mt-1">Upload resources for public access</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-900/20 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Upload File
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
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">File Details</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date Added</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex justify-center items-center flex-col space-y-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                      <p className="text-sm font-medium">Loading downloads...</p>
                    </div>
                  </td>
                </tr>
              ) : downloads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="bg-slate-100 p-4 rounded-full">
                        <Download className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium">No downloads found. Add one to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                downloads.map((download) => (
                  <tr key={download._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                          <a href={download.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 hover:text-blue-800 mb-1 block">
                            {download.title}
                          </a>
                          <div className="text-sm text-slate-500 truncate max-w-md">{download.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {download.fileSize}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">
                      {new Date(download.createdAt).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDelete(download._id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
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

      {/* Add Download Modal */}
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
                        Add New Download
                      </h3>
                      <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Select File</label>
                        <div 
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-slate-50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="space-y-1 text-center">
                            {selectedFile ? (
                              <div className="relative">
                                <FileText className="mx-auto h-12 w-12 text-blue-500" />
                                <div className="mt-2 text-sm text-slate-900 font-medium truncate max-w-xs">{selectedFile.name}</div>
                                <div className="text-xs text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                                <div className="mt-2 text-sm text-blue-600 font-medium">Click to change file</div>
                              </div>
                            ) : (
                              <>
                                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                <div className="flex text-sm text-slate-600 justify-center">
                                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                    <span>Upload a file</span>
                                  </span>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                              </>
                            )}
                          </div>
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange} 
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          className="hidden" 
                        />
                      </div>

                      <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">File Title</label>
                        <input 
                          type="text" 
                          id="title" 
                          required 
                          value={formData.title} 
                          onChange={(e) => setFormData({...formData, title: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                          placeholder="e.g., Admission Form 2024"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea 
                          id="description" 
                          rows={3} 
                          required 
                          value={formData.description} 
                          onChange={(e) => setFormData({...formData, description: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white resize-none"
                          placeholder="Brief description of the file..."
                        ></textarea>
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
                      Add Download
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
