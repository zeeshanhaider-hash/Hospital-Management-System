import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { 
  Layout, // ✅ Safe Icon
  Users, Stethoscope, CalendarDays,
  FileText, Settings, Sun, Moon, Menu, X, LogOut
} from 'lucide-react';

const SidebarItem = ({ id, label, Icon }) => {
  const location = useLocation(); // ✅ KEY FIX: Detect URL

  // Check if path includes the id to highlight blue
  const isActive = location.pathname.includes(id);

  return (
    <NavLink
      to={`#`} // Use hash to prevent full reload, visual only
      onClick={(e) => e.preventDefault()}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

const DashboardLayout = () => {
  const { darkMode, toggleDarkMode, user, logoutUser } = React.useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  const getConsoleTitle = () => {
    if (!user) return "Console";
    if (user.role === 'admin') return "Admin Console";
    if (user.role === 'doctor') return "Doctor Console";
    if (user.role === 'user') return "Patient Console"; 
    return "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          
          {/* Sidebar Header */}
          <div className="flex items-center space-x-2 p-6 mb-6">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/30">Z</div>
            <span className="text-xl font-black text-slate-800 dark:text-white">ZH<span className="text-cyan-500">-Care</span></span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            
            {/* ADMIN LINKS */}
            {user?.role === 'admin' && (
              <>
                <SidebarItem id="dashboard/overview" label="Overview" Icon={Layout} />
                <SidebarItem id="dashboard/users" label="Users List" Icon={Users} />
                <SidebarItem id="dashboard/doctors" label="Doctors List" Icon={Stethoscope} />
                <SidebarItem id="dashboard/patients" label="Patients List" Icon={Users} />
                <SidebarItem id="dashboard/appointments" label="Appointments" Icon={CalendarDays} />
                <SidebarItem id="dashboard/billing" label="Billing" Icon={FileText} />
              </>
            )}

            {/* DOCTOR LINKS */}
            {user?.role === 'doctor' && (
              <>
                <SidebarItem id="dashboard/appointments" label="My Appointments" Icon={CalendarDays} />
                <SidebarItem id="dashboard/patients" label="My Patients" Icon={Users} />
                <SidebarItem id="dashboard/prescriptions" label="Prescriptions" Icon={FileText} />
                <SidebarItem id="dashboard/billing" label="Billing" Icon={FileText} />
              </>
            )}

            {/* PATIENT LINKS */}
            {user?.role === 'user' && (
              <>
                <SidebarItem id="dashboard/appointments" label="My Appointments" Icon={CalendarDays} />
                <SidebarItem id="dashboard/doctors" label="Find Doctors" Icon={Stethoscope} />
                <SidebarItem id="dashboard/billing" label="My Bills" Icon={FileText} />
              </>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Top Navbar */}
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {getConsoleTitle()}
            </h2>
            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-transform">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-950">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default DashboardLayout;