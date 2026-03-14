import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  createdAt: string;
}

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/public/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        setIsModalOpen(false);
        setFormData({ title: '', description: '', date: '', location: '' });
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/v1/admin/events/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setEvents(events.filter(e => e._id !== id));
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Events</h1>
            <p className="text-sm text-slate-500 font-light mt-1">Schedule and publish events</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-900/20 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          Create Event
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
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Event Details</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex justify-center items-center flex-col space-y-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                      <p className="text-sm font-medium">Loading events...</p>
                    </div>
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="bg-slate-100 p-4 rounded-full">
                        <Calendar className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium">No events found. Create one to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="text-sm font-bold text-slate-900 mb-1">{event.title}</div>
                      <div className="text-sm text-slate-500 truncate max-w-md">{event.description}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {new Date(event.date).toLocaleString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDelete(event._id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
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

      {/* Create Event Modal */}
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
                        Create New Event
                      </h3>
                      <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">Event Title</label>
                        <input 
                          type="text" 
                          id="title" 
                          required 
                          value={formData.title} 
                          onChange={(e) => setFormData({...formData, title: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                          placeholder="e.g., Annual Science Fair"
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-1">Date & Time</label>
                        <input 
                          type="datetime-local" 
                          id="date" 
                          required 
                          value={formData.date} 
                          onChange={(e) => setFormData({...formData, date: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                        <input 
                          type="text" 
                          id="location" 
                          required 
                          value={formData.location} 
                          onChange={(e) => setFormData({...formData, location: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white" 
                          placeholder="e.g., Main Auditorium"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea 
                          id="description" 
                          rows={4} 
                          required 
                          value={formData.description} 
                          onChange={(e) => setFormData({...formData, description: e.target.value})} 
                          className="block w-full border border-slate-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50 focus:bg-white resize-none"
                          placeholder="Enter event details..."
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
                      Create Event
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
