import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Annual Science Exhibition',
      date: 'October 15, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'College Main Auditorium',
      institution: 'Degree College',
      description: 'Join us for the annual science exhibition showcasing innovative projects by our students across various disciplines.',
      image: 'https://picsum.photos/seed/science/800/400'
    },
    {
      id: 2,
      title: 'Sports Meet 2026',
      date: 'November 5, 2026',
      time: '8:00 AM - 5:00 PM',
      location: 'Group Sports Complex',
      institution: 'English Medium School',
      description: 'A day of athletic excellence and sportsmanship featuring track and field events, team sports, and more.',
      image: 'https://picsum.photos/seed/sports/800/400'
    },
    {
      id: 3,
      title: 'Cultural Festival: "Virasat"',
      date: 'December 20, 2026',
      time: '5:00 PM - 9:00 PM',
      location: 'Open Air Theatre',
      institution: 'Hindi Medium School',
      description: 'Celebrating our rich cultural heritage through music, dance, and drama performances by our talented students.',
      image: 'https://picsum.photos/seed/culture/800/400'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">Upcoming Events</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Mark your calendars for these exciting events happening across our institutions.
          </p>
        </motion.div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={event.id} 
              className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-all duration-500 border border-slate-200"
            >
              <div className="md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg tracking-wider uppercase border border-white/50">
                  {event.institution}
                </div>
              </div>
              <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif group-hover:text-blue-700 transition-colors">{event.title}</h2>
                
                <div className="flex flex-wrap gap-y-3 gap-x-6 mb-8 text-slate-600 text-sm font-medium">
                  <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" /> 
                    {event.date}
                  </div>
                  <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Clock className="h-4 w-4 mr-2 text-amber-500" /> 
                    {event.time}
                  </div>
                  <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-600" /> 
                    {event.location}
                  </div>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
                  {event.description}
                </p>
                
                <div className="mt-auto">
                  <button className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors duration-300 group/btn">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
