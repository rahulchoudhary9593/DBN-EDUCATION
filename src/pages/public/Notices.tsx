import { useState, useEffect } from 'react';
import { Calendar, FileText, Download, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface Notice {
  _id: string;
  title: string;
  content: string;
  targetInstitution: string;
  publishDate: string;
}

export default function Notices() {
  const [activeTab, setActiveTab] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeTab !== 'All') params.append('institution', activeTab);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const url = `/api/v1/public/notices${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url);
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

    fetchNotices();
  }, [activeTab, startDate, endDate]);

  const tabs = ['All', 'Global', 'College', 'EnglishSchool', 'HindiSchool'];

  const getInstitutionLabel = (inst: string) => {
    switch(inst) {
      case 'Global': return 'General Notice';
      case 'College': return 'Degree College';
      case 'EnglishSchool': return 'English Medium School';
      case 'HindiSchool': return 'Hindi Medium School';
      default: return inst;
    }
  };

  const getInstitutionColor = (inst: string) => {
    switch(inst) {
      case 'Global': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'College': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'EnglishSchool': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'HindiSchool': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">Notice Board</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Stay updated with the latest announcements, circulars, and news across our institutions.
          </p>
        </motion.div>

        {/* Filter Tabs & Date Range */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm tracking-wide ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab === 'All' ? 'All Notices' : getInstitutionLabel(tab)}
              </button>
            ))}
          </div>

          {/* Date Range Filter */}
          <div className="flex flex-wrap justify-center items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <label htmlFor="startDate" className="text-sm font-medium text-slate-600">From:</label>
              <input 
                type="date" 
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="endDate" className="text-sm font-medium text-slate-600">To:</label>
              <input 
                type="date" 
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {(startDate || endDate) && (
              <button 
                onClick={() => { setStartDate(''); setEndDate(''); }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
              >
                Clear Dates
              </button>
            )}
          </div>
        </motion.div>

        {/* Notices List */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : notices.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-200"
            >
              <FileText className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-medium text-slate-900 font-serif">No notices found</h3>
              <p className="text-slate-500 mt-2">There are currently no active notices for this category.</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {notices.map((notice, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={notice._id} 
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group"
                >
                  <div className="p-6 sm:p-8 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getInstitutionColor(notice.targetInstitution)}`}>
                          {getInstitutionLabel(notice.targetInstitution)}
                        </span>
                        <span className="flex items-center text-sm text-slate-500 font-medium">
                          <Calendar className="h-4 w-4 mr-1.5 text-slate-400" />
                          {new Date(notice.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif group-hover:text-blue-700 transition-colors">{notice.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {notice.content}
                    </p>
                    
                    <div className="flex items-center pt-6 border-t border-slate-100">
                      <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group/btn">
                        <Download className="h-4 w-4 mr-2 group-hover/btn:-translate-y-1 transition-transform" />
                        Download Attachment
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
