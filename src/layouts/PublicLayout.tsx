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

  // for number click → open WhatsApp with pre-filled message, fallback to call if WhatsApp not available
  const handlePhoneClick = (): void => {
    const phoneNumber = "919929942930";

    const message = `Namaste,
Me aapki school ke bare me janna chahta hu.
Me admission enquiry ke liye message kar raha hu.

Meri class: [Apni Class Likhe]

Kripya admission process aur details bataye.
Dhanyavaad.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

    // try opening WhatsApp
    window.location.href = whatsappAppUrl;

    // fallback → normal call
    setTimeout(() => {
      window.location.href = `tel:+${phoneNumber}`;
    }, 1500);
  };
  //  for email click → open default mail client with pre-filled email, fallback to Gmail web compose if no mail client configured
  const handleEmailClick = (): void => {
    const email = "dbnmeharana@gmail.com";
    const subject = "Admission Enquiry";
    const body = `Namaste,
Me aapki school ke bare me janna chahta hu.
Me admission enquiry ke liye message kar raha hu.

Meri class: [Apni Class]

Kripya admission process aur details bataye.
Dhanyavaad.`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebLink = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Try mailto
    window.location.href = mailtoLink;

    // fallback → Gmail web
    setTimeout(() => {
      window.open(gmailWebLink, "_blank");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex space-x-6">
          <span
            className="flex items-center cursor-pointer"
            onClick={handlePhoneClick}>
            <Phone size={16} className="mr-2 text-amber-500" /> +91 99299 42930
          </span>

          <span
            className="flex items-center cursor-pointer"
            onClick={handleEmailClick}><Mail size={16} className="mr-2 text-amber-500" /> dbnmeharana@gmail.com
          </span>
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

                {/* Logo Image */}
                <img
                  src="https://scontent.fbep1-1.fna.fbcdn.net/v/t39.30808-1/338164863_142285068779721_6490969435390663081_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=s9xoRDKd_W8Q7kNvwFMo8tj&_nc_oc=AdkiYaCakVkxPag0pqN-jfJMK6Ra-ngWV3V_toqod9mDxQdQQr2bqOZRcvsnDNR-v58&_nc_zt=24&_nc_ht=scontent.fbep1-1.fna&_nc_gid=zgcM8kyCBYiF-iOZQJFY0Q&_nc_ss=8&oh=00_Afx4VQ3NrE0gl8U8cHOcllLF8TLQc6tPMiTMvtGiUMgH6A&oe=69BAF7AD"
                  alt="Dayanand Education Group Logo"
                  className="w-12 h-12 object-contain"
                />

                {/* Title */}
                <div>
                  <h1 className="text-xl font-bold text-slate-900 leading-tight font-serif">
                    Dayanand Education Group
                  </h1>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Excellence in Learning
                  </p>
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
                <li className="flex items-start">
                  <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-amber-500" />

                  <a
                    href="https://maps.app.goo.gl/bH7no5roUA42Qa8L7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition"
                  >
                    Dayanand Senior Secondary School <br />
                    High school in Maharana, Rajasthan
                  </a>

                </li>
                <li
                  onClick={handlePhoneClick}
                  className="flex items-center cursor-pointer hover:text-amber-400 transition"
                >
                  <Phone size={18} className="mr-2 flex-shrink-0 text-amber-500" />
                  +91 99299 42930
                </li>
                <li
                  onClick={handleEmailClick}
                  className="flex items-center cursor-pointer hover:text-amber-400 transition"
                >
                  <Mail size={18} className="mr-2 flex-shrink-0 text-amber-500" />
                  dbnmeharana@gmail.com
                </li>
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
        href="https://wa.me/919929942930?text=Hello%20Dayanand%20Education%20Group!%20I%20would%20like%20to%20inquire%20about%20your%20institutions. Please%20provide%20more%20information."
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
