import { motion } from 'motion/react';
import { BookOpen, Target, Lightbulb, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">About Us</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Dedicated to excellence in education and holistic development since 1998.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mr-4">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">Our Vision</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-light pl-16 border-l-4 border-blue-100">
                  To be a premier educational institution that fosters intellectual curiosity, ethical values, and global citizenship, empowering students to become leaders of tomorrow.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 mr-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">Our Mission</h2>
                </div>
                <ul className="space-y-4 text-lg text-slate-600 font-light pl-16">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                    Provide accessible, high-quality education across all levels.
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                    Cultivate a culture of innovation and critical thinking.
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                    Promote inclusivity and respect for diverse cultures.
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                    Equip students with skills necessary for the modern workforce.
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative h-96 lg:h-auto overflow-hidden group">
              <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              <img 
                src="https://picsum.photos/seed/aboutus/800/1000" 
                alt="Campus Life" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/80 to-transparent z-20">
                <div className="flex items-center text-white">
                  <Users className="w-8 h-8 mr-4 text-amber-400" />
                  <div>
                    <p className="text-3xl font-bold font-serif">10,000+</p>
                    <p className="text-sm uppercase tracking-wider font-semibold text-slate-200">Alumni Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
