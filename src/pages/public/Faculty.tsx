import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface FacultyMember {
  id: number;
  name: string;
  department: string;
  designation: string;
  institution: string;
  imageUrl: string;
}

export default function Faculty() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'School' | 'College'>('School');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, [activeTab]);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/public/faculty?institution=${activeTab}`);
      if (response.ok) {
        const data = await response.json();
        setFaculty(data);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 font-serif mb-4"
          >
            Our Esteemed Faculty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto font-light"
          >
            Meet the dedicated educators who inspire, guide, and shape the future of our students.
          </motion.p>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex p-1 bg-white rounded-xl shadow-sm border border-slate-200 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('School')}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'School'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>School Faculty</span>
            </button>
            <button
              onClick={() => setActiveTab('College')}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'College'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="h-5 w-5" />
              <span>College Faculty</span>
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <Users className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No faculty members found</h3>
            <p className="text-slate-500">
              {searchTerm ? "We couldn't find any faculty matching your search." : `No faculty members have been added to the ${activeTab} section yet.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFaculty.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-slate-100">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                      <Users className="h-20 w-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center relative bg-white">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                    {member.department}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1 font-serif">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm">{member.designation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}