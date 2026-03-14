import { Outlet, Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Institutions', path: '/institutions' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Notices', path: '/notices' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex space-x-6">
          <span className="flex items-center"><Phone size={16} className="mr-2 text-amber-500" /> +91 98765 43210</span>
          <span className="flex items-center"><Mail size={16} className="mr-2 text-amber-500" /> info@educationgroup.edu</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/admin/login" className="hover:text-amber-400 transition">Admin Login</Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl font-serif">
                  DEG
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 leading-tight font-serif">Dayanand Education Group</h1>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Excellence in Learning</p>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                  to="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-slate-50"
                >
                  Admin Login
                </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold text-xl font-serif">
                  DEG
                </div>
                <h2 className="text-xl font-bold font-serif">Dayanand Education Group</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering minds and shaping futures through quality education across our College, Hindi Medium, and English Medium schools.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block font-serif text-amber-500">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
                <li><Link to="/admissions" className="hover:text-amber-400 transition">Admissions</Link></li>
                <li><Link to="/notices" className="hover:text-amber-400 transition">Notice Board</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block font-serif text-amber-500">Our Institutions</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/institutions?filter=college" className="hover:text-amber-400 transition">Degree College</Link></li>
                <li><Link to="/institutions?filter=english" className="hover:text-amber-400 transition">English Medium School</Link></li>
                <li><Link to="/institutions?filter=hindi" className="hover:text-amber-400 transition">Hindi Medium School</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2 inline-block font-serif text-amber-500">Contact Info</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start"><MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-amber-500" /> 123 Education Hub, Knowledge City, State - 123456</li>
                <li className="flex items-center"><Phone size={18} className="mr-2 flex-shrink-0 text-amber-500" /> +91 98765 43210</li>
                <li className="flex items-center"><Mail size={18} className="mr-2 flex-shrink-0 text-amber-500" /> info@educationgroup.edu</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Dayanand Education Group. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
