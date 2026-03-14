import { FileText, Download as DownloadIcon, FolderDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function Downloads() {
  const downloads = [
    { id: 1, title: 'College Prospectus 2026-27', type: 'PDF', size: '2.5 MB', category: 'College' },
    { id: 2, title: 'School Admission Form', type: 'PDF', size: '1.2 MB', category: 'School' },
    { id: 3, title: 'Academic Calendar 2026', type: 'PDF', size: '0.8 MB', category: 'Global' },
    { id: 4, title: 'Fee Structure - College', type: 'PDF', size: '1.5 MB', category: 'College' },
    { id: 5, title: 'Syllabus - Class 10', type: 'PDF', size: '3.1 MB', category: 'School' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
            <FolderDown className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">Downloads</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Access important documents, forms, and resources.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200"
        >
          <ul className="divide-y divide-slate-100">
            {downloads.map((item, index) => (
              <motion.li 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                key={item.id} 
                className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-2 space-x-3">
                      <span className="font-medium bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 text-xs tracking-wide">{item.type}</span>
                      <span className="text-slate-400">•</span>
                      <span>{item.size}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-blue-600 font-medium">{item.category}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 w-full sm:w-auto group/btn">
                  <DownloadIcon className="h-4 w-4 mr-2 group-hover/btn:-translate-y-0.5 transition-transform" />
                  Download
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
