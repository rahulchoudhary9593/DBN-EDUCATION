import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Download, Mail, Phone, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface Inquiry {
  _id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  institution: string;
  programOrClass: string;
  status: string;
  createdAt: string;
}

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstitution, setFilterInstitution] = useState('All');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('/api/v1/admin/inquiries');
        if (response.ok) {
          const data = await response.json();
          setInquiries(data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inq.phone.includes(searchTerm);
    const matchesInst = filterInstitution === 'All' || inq.institution === filterInstitution;
    return matchesSearch && matchesInst;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Admitted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Closed': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Inquiries</h1>
            <p className="text-sm text-slate-500 font-light mt-1">View and manage admission inquiries</p>
          </div>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-200">
          <Download className="h-4 w-4 mr-2 text-slate-500" />
          Export CSV
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="flex items-center space-x-2 text-sm font-medium text-slate-600 bg-white px-3 py-2.5 border border-slate-200 rounded-xl shadow-sm">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filterInstitution}
                onChange={(e) => setFilterInstitution(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 cursor-pointer pr-6"
              >
                <option value="All">All Institutions</option>
                <option value="College">Degree College</option>
                <option value="EnglishSchool">English School</option>
                <option value="HindiSchool">Hindi School</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Institution / Program</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex justify-center items-center flex-col space-y-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                      <p className="text-sm font-medium">Loading inquiries...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="bg-slate-100 p-3 rounded-full">
                        <Search className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium">No inquiries found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-sm">
                          {inquiry.studentName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">{inquiry.studentName}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Parent: {inquiry.parentName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-slate-700 flex items-center font-medium"><Phone className="h-3.5 w-3.5 mr-2 text-slate-400"/> {inquiry.phone}</div>
                      {inquiry.email && <div className="text-xs text-slate-500 flex items-center mt-1.5"><Mail className="h-3.5 w-3.5 mr-2 text-slate-400"/> {inquiry.email}</div>}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {inquiry.institution}
                      </span>
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">{inquiry.programOrClass}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {new Date(inquiry.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-400 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600">
                Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">{filteredInquiries.length}</span> of <span className="font-bold text-slate-900">{filteredInquiries.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-blue-50 text-sm font-bold text-blue-600 z-10">
                  1
                </button>
                <button className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
