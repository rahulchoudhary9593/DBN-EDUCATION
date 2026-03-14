import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6 font-serif">Contact Us</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            We'd love to hear from you. Get in touch with our team for any queries or assistance.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-slate-200"
        >
          {/* Contact Info */}
          <div className="bg-slate-900 p-10 lg:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-bl-full opacity-10 -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500 rounded-tr-full opacity-10 -z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 font-serif">Get In Touch</h2>
              <p className="text-slate-300 mb-12 text-lg leading-relaxed font-light">
                Whether you have a question about admissions, programs, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner border border-slate-700">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-white mb-1">Our Campus</h3>
                    <p className="text-slate-300 leading-relaxed">123 Education Hub, Knowledge City,<br />State - 123456, India</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-inner border border-slate-700">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-white mb-1">Phone</h3>
                    <p className="text-slate-300 leading-relaxed">+91 98765 43210<br />+91 12345 67890</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-800 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-inner border border-slate-700">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                    <p className="text-slate-300 leading-relaxed">info@educationgroup.edu<br />admissions@educationgroup.edu</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-800 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300 shadow-inner border border-slate-700">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-white mb-1">Office Hours</h3>
                    <p className="text-slate-300 leading-relaxed">Monday - Saturday<br />9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 lg:p-16 flex flex-col justify-center bg-white">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input type="text" id="firstName" className="block w-full border border-slate-200 rounded-xl shadow-sm py-3.5 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input type="text" id="lastName" className="block w-full border border-slate-200 rounded-xl shadow-sm py-3.5 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" id="email" className="block w-full border border-slate-200 rounded-xl shadow-sm py-3.5 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input type="text" id="subject" className="block w-full border border-slate-200 rounded-xl shadow-sm py-3.5 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="How can we help you?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea id="message" rows={5} className="block w-full border border-slate-200 rounded-xl shadow-sm py-3.5 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Your message here..."></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 group">
                  Send Message
                  <Send className="ml-2 h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
