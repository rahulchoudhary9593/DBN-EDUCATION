import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  
  const images = [
    { id: 1, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/512615208_23998467386455751_8470351282419508893_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0327a3&_nc_ohc=wnRxxUdiSrwQ7kNvwFZLc-P&_nc_oc=AdkRmwMlYLG17b0QQcoZCNEOE4s3B4-eShiLtbjiEwaRh01BmWcgDzS8b27vf3DW7Fg&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=NkUoZb6QFFRWSTGhXJ27wQ&_nc_ss=8&oh=00_AfwKaDNECfaU8B8EQWPUy1i4IbgLT3-gG-wpSLU7A7LY9A&oe=69BAEC0D', category: 'College', title: 'Science Lab' },
    { id: 2, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/510236525_23984249021210921_2061822632623997424_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ce0548&_nc_ohc=CeXwm8CYlPgQ7kNvwFa-wHm&_nc_oc=AdlDqimXzzQGFF8NQRl52A2Un4bjrQgC8wb9_aLciyLOD9n4_nxTZSg3vCMswwE3Gp0&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=Tk8xJr0XEAvk6gy8Zy0SSA&_nc_ss=8&oh=00_AfwZnPZgCCobTiUFg84zBNu_8JBYKz4BufqKhvITapjuoA&oe=69BAEE7D', category: 'EnglishSchool', title: 'Annual Sports Day' },
    { id: 3, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/509436710_23965644746404682_5905964751331902398_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ce0548&_nc_ohc=dD9N_2vfvFgQ7kNvwEB9ybA&_nc_oc=AdndCOEeui32A6v6_fani82bL1WPVQDrOw5wGcj2xqSi8A2T0omKrat1u3uRCjNw9Iw&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=zUQT9_8_wwh3ynI9DgHQ0g&_nc_ss=8&oh=00_Afyldti-Wg3O1LBZzFtb99vDoKgHMJ_80sVNWEAiCFVh9w&oe=69BAFBF5', category: 'HindiSchool', title: 'Cultural Fest' },
    { id: 4, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/487346299_9582474108481652_4398648609972565475_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2a1932&_nc_ohc=yS0YjfWvNZcQ7kNvwGfNruU&_nc_oc=Adk50Jzl9_fAHFRjSyDjrgEkvyYcNsZ_Zk-IIf6o8NgA_q09fNB-nonLnP88rxGSgW8&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=1WfjwP7HJRGQXR3XmEOBpA&_nc_ss=8&oh=00_Afzjj8QZiP0wMbKA9Vh_zE5RZj20YytFKD9i3z6Lf0yiEQ&oe=69BAEBC3', category: 'College', title: 'Library' },
    { id: 5, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/476837827_9305090396220026_5622636087635991115_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=53a332&_nc_ohc=r5SYMRQbg4IQ7kNvwH3rDCn&_nc_oc=Admp5vLcAR8k--nwDAluQJgdPYtdw5yNgtlGM7neadVzwo4vD9dRY_ECvUcReHinCdw&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=9r-lN_-vc3cbS6zqGoL60g&_nc_ss=8&oh=00_AfxXVy9vAExmXHiSBOUS9a01i8npQg3SuWwPDl1yGPee2g&oe=69BAD1DF', category: 'EnglishSchool', title: 'Computer Lab' },
    { id: 6, src: 'https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-6/486824898_9552390248156705_4364007553091773661_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=AgDN1OnTWBsQ7kNvwGIv7wI&_nc_oc=Adk6_SGhqd2eRL-4bZKI483xcxMcu_tFaNBWBQ8dOll6F8WeThkkKRt5au9rtEN-9uc&_nc_zt=23&_nc_ht=scontent.fbep1-1.fna&_nc_gid=ev1UfIKH2DuvEFWPDYquaA&_nc_ss=8&oh=00_AfznXGBkYAw4JF052mDEp-iBGf3_K_GToIq2WrDr1rqWUQ&oe=69BAF4E2', category: 'HindiSchool', title: 'Classroom' },
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
