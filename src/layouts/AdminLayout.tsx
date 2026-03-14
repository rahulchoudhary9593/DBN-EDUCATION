import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Users, FileText, Image, Calendar, LogOut, Menu, X, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Simple auth check (mock)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <Users size={20} /> },
    { name: 'Notices', path: '/admin/notices', icon: <Bell size={20} /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} /> },
    { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
    { name: 'Downloads', path: '/admin/downloads', icon: <FileText size={20} /> },
    { name: 'Faculty', path: '/admin/faculty', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute z-50 h-full'
        } lg:relative lg:translate-x-0 shadow-2xl`}
      >
        <div className="h-20 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider font-serif">Admin Portal</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`mr-3 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110 group-hover:text-blue-400'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 bg-slate-950 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 group"
          >
            <LogOut size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-10 z-10 border-b border-slate-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-900 focus:outline-none transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-white shadow-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
