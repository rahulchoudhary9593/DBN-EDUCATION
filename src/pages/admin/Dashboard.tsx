import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Activity, ArrowRight, Bell, Calendar, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalInquiries: 0, totalNotices: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/v1/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Inquiries', value: stats.totalInquiries, icon: <Users className="h-7 w-7 text-blue-600" />, change: '+12%', color: 'bg-blue-50', border: 'border-blue-100' },
    { name: 'Active Notices', value: stats.totalNotices, icon: <Bell className="h-7 w-7 text-amber-600" />, change: '+4%', color: 'bg-amber-50', border: 'border-amber-100' },
    { name: 'Website Visits', value: '12,450', icon: <Activity className="h-7 w-7 text-emerald-600" />, change: '+24%', color: 'bg-emerald-50', border: 'border-emerald-100' },
    { name: 'Conversion Rate', value: '4.2%', icon: <TrendingUp className="h-7 w-7 text-purple-600" />, change: '+1.2%', color: 'bg-purple-50', border: 'border-purple-100' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 font-light">Welcome back, here's what's happening today.</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm inline-flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
          Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-14 w-14 bg-slate-100 rounded-xl"></div>
                <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
              </div>
              <div className="h-4 bg-slate-100 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-slate-100 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={stat.name} 
              className={`bg-white rounded-2xl shadow-sm p-6 border ${stat.border} hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3.5 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.name}</h3>
                <p className="text-3xl font-bold text-slate-900 font-serif">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Recent Inquiries Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 font-serif">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-sm text-blue-600 font-semibold hover:text-blue-800 flex items-center group">
              View All
              <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-white shadow-sm">
                    S{i}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Student Name {i}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Degree College • B.Sc IT</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  New
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-8 font-serif">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/admin/notices" className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors mr-4">
                <Bell className="h-6 w-6 text-slate-500 group-hover:text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Post Notice</h3>
                <p className="text-xs text-slate-500 mt-0.5">Publish a new announcement</p>
              </div>
            </Link>
            
            <Link to="/admin/gallery" className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-amber-100 transition-colors mr-4">
                <ImageIcon className="h-6 w-6 text-slate-500 group-hover:text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Add Photos</h3>
                <p className="text-xs text-slate-500 mt-0.5">Upload to gallery</p>
              </div>
            </Link>

            <Link to="/admin/events" className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md transition-all duration-300 group">
              <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors mr-4">
                <Calendar className="h-6 w-6 text-slate-500 group-hover:text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Create Event</h3>
                <p className="text-xs text-slate-500 mt-0.5">Schedule a new event</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
