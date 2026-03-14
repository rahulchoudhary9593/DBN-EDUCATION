import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  
  const images = [
    { id: 1, src: 'https://picsum.photos/seed/gal1/600/400', category: 'College', title: 'Science Lab' },
    { id: 2, src: 'https://picsum.photos/seed/gal2/600/400', category: 'EnglishSchool', title: 'Annual Sports Day' },
    { id: 3, src: 'https://picsum.photos/seed/gal3/600/400', category: 'HindiSchool', title: 'Cultural Fest' },
    { id: 4, src: 'https://picsum.photos/seed/gal4/600/400', category: 'College', title: 'Library' },
    { id: 5, src: 'https://picsum.photos/seed/gal5/600/400', category: 'EnglishSchool', title: 'Computer Lab' },
    { id: 6, src: 'https://picsum.photos/seed/gal6/600/400', category: 'HindiSchool', title: 'Classroom' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
            <ImageIcon className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">Photo Gallery</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Glimpses of life at the Dayanand Education Group.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', 'College', 'EnglishSchool', 'HindiSchool'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm tracking-wide ${
                filter === cat 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'EnglishSchool' ? 'English School' : cat === 'HindiSchool' ? 'Hindi School' : cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id} 
                className="bg-white rounded-3xl shadow-sm overflow-hidden group border border-slate-200"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                        {img.category === 'EnglishSchool' ? 'English School' : img.category === 'HindiSchool' ? 'Hindi School' : img.category}
                      </span>
                      <h3 className="text-white font-bold text-2xl font-serif drop-shadow-md">{img.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
