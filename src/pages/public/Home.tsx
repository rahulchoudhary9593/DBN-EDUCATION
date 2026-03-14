import { ArrowRight, BookOpen, Users, Trophy, GraduationCap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/campus-premium/1920/1080"
            alt="Campus"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-2/3 lg:w-1/2"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Excellence in Education Since 1998
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 font-serif leading-tight">
              Empowering Minds, <br />
              <span className="text-amber-500 italic">Shaping Futures</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
              Welcome to the Dayanand Education Group. We provide world-class education from primary school to degree college, fostering academic excellence and holistic development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-amber-500 hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1"
              >
                Apply for Admission
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                to="/institutions"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-base font-medium rounded-lg text-white hover:bg-slate-800 transition-all hover:-translate-y-1"
              >
                Explore Institutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-200 relative z-10 -mt-10 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-5xl font-bold text-blue-600 mb-2 font-serif">3</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Institutions</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-5xl font-bold text-blue-600 mb-2 font-serif">5k+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Students</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-5xl font-bold text-blue-600 mb-2 font-serif">200+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Faculty</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="text-5xl font-bold text-blue-600 mb-2 font-serif">25+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years of Excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutions Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">Our Institutions</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
            <p className="max-w-2xl text-lg text-slate-600 mx-auto">
              A complete educational journey under one roof, providing seamless progression from early years to higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* College */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://picsum.photos/seed/college-premium/800/600" alt="College" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 z-20 flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1" /> Higher Ed
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Degree College</h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  Offering undergraduate and postgraduate programs in Arts, Science, and Commerce with state-of-the-art facilities.
                </p>
                <Link to="/institutions?filter=college" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 group-hover:translate-x-2 transition-transform">
                  Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* English School */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://picsum.photos/seed/englishschool-premium/800/600" alt="English School" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 z-20 flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" /> K-10
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">English Medium School</h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  Classes from Nursery to 10th standard focusing on modern pedagogy, critical thinking, and all-round development.
                </p>
                <Link to="/institutions?filter=english" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 group-hover:translate-x-2 transition-transform">
                  Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Hindi School */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://picsum.photos/seed/hindischool-premium/800/600" alt="Hindi School" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 z-20 flex items-center">
                  <BookOpen className="w-3 h-3 mr-1" /> 1-12
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Hindi Medium School</h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  Classes 1 to 12 providing quality education rooted in cultural values, academic rigor, and character building.
                </p>
                <Link to="/institutions?filter=hindi" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 group-hover:translate-x-2 transition-transform">
                  Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 font-serif mb-6">Why Choose Us?</h2>
              <div className="w-16 h-1 bg-amber-500 mb-8 rounded-full"></div>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                We believe in providing an environment that nurtures intellectual curiosity, critical thinking, and moral values, preparing students for the challenges of tomorrow.
              </p>
              
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <BookOpen className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 font-serif">Comprehensive Curriculum</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">Updated syllabus aligned with modern educational standards and competitive exams.</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <Users className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 font-serif">Expert Faculty</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">Highly qualified and experienced teachers dedicated to student success and mentorship.</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                      <Trophy className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 font-serif">Holistic Development</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">Focus on sports, arts, and extracurricular activities alongside academic excellence.</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4 opacity-10"></div>
              <img
                className="rounded-2xl shadow-2xl relative z-10 object-cover h-[600px] w-full"
                src="https://picsum.photos/seed/students-premium/800/1000"
                alt="Students studying"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl z-20 border border-slate-100"
              >
                <div className="text-5xl font-bold text-amber-500 mb-2 font-serif">100%</div>
                <div className="text-sm font-bold text-slate-700 uppercase tracking-widest">Passing Rate</div>
                <div className="text-xs text-slate-500 mt-1">Last 5 Academic Years</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
