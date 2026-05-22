// // html file code


// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <title>Hospital Management System</title>
//     <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
//   </head>
//   <body>
//     <noscript>You need to enable JavaScript to run this app.</noscript>
//     <div id="root"></div>
//   </body>
// </html>


// // axios.jsx file code:

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/api/v1', // Your backend URL
//   withCredentials: true, // CRITICAL: Required to send/save your JWT cookie!
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default API;

// // AdminSidebar.jsx file code : 


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiHome, FiUsers, FiCalendar, FiUserCheck, FiLogOut } from 'react-icons/fi';
// import { UserContext } from '../../context/UserContext';

// const AdminSidebar = () => {
//   const location = useLocation();
//   const { logoutUser } = React.useContext(UserContext);

//   const menuItems = [
//     { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
//     { name: 'Doctors', path: '/admin/doctors', icon: <FiUserCheck /> },
//     { name: 'Appointments', path: '/admin/appointments', icon: <FiCalendar /> },
//     { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
//   ];

//   const handleLogout = async () => {
//     await logoutUser();
//     window.location.href = '/login';
//   };

//   return (
//     <aside className="w-64 min-h-screen bg-gray-900 text-white fixed left-0 top-16">
//       <div className="p-4">
//         <h2 className="text-lg font-semibold mb-4 text-blue-400">Admin Panel</h2>
        
//         <nav className="space-y-1">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 location.pathname === item.path
//                   ? 'bg-blue-600 text-white'
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-8 pt-4 border-t border-gray-700">
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 w-full"
//           >
//             <FiLogOut />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// // AppoinmentCard.jsx file code : 


// import React from 'react';

// const AppointmentCard = ({ appointment }) => {
//   const { date, time, status, doctor } = appointment;

//   const statusColors = {
//     Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
//     Approved: 'bg-green-100 text-green-700 border-green-300',
//     Rejected: 'bg-red-100 text-red-700 border-red-300',
//     Completed: 'bg-blue-100 text-blue-700 border-blue-300',
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         {/* Doctor Info */}
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <span className="text-xl">👨‍⚕️</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800">
//               {doctor?.user?.name || 'Doctor'}
//             </h3>
//             <p className="text-sm text-gray-500">{doctor?.specialization}</p>
//           </div>
//         </div>

//         {/* Date & Time */}
//         <div className="text-center sm:text-right">
//           <p className="text-gray-600 text-sm">
//             {new Date(date).toLocaleDateString('en-PK', {
//               weekday: 'short',
//               year: 'numeric',
//               month: 'short',
//               day: 'numeric',
//             })}
//           </p>
//           <p className="text-blue-600 font-medium">{time}</p>
//         </div>

//         {/* Status */}
//         <span
//           className={`px-3 py-1 rounded-full text-sm font-medium border ${
//             statusColors[status] || 'bg-gray-100 text-gray-700'
//           }`}
//         >
//           {status}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default AppointmentCard;

// // my EmergencyBtn.jsx,ErrorBoundary.jsx,FiMousePointer.jsx,Loader.jsx,Navbar.jsx,and protectedRoute Code:

// import React, { useState } from 'react';
// import { PhoneOff, Phone } from 'lucide-react';

// const EmergencyBtn = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center space-y-2">
//       {/* Pulsing Circle */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl transition-all ${
//           isOpen 
//             ? 'bg-red-600 shadow-red-500/30' 
//             : 'bg-red-600 shadow-lg shadow-red-500/50 animate-pulse'
//         }`}
//       >
//         {isOpen ? <PhoneOff size={28} /> : <Phone size={28} />}
//       </motion.button>

//       {/* Expanding Call Card */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 20 }}
//           className="absolute bottom-24 left-0 bg-white rounded-2xl shadow-2xl p-6 w-64 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-2xl"
//         >
//           <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//             <Phone className="text-red-600 text-2xl" />
//           </div>
//           <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center mb-1">Emergency</h3>
//           <p className="text-sm text-slate-500 text-center mb-4">Call 112 right now!</p>
//           <a 
//             href="tel:112" 
//             className="block w-full text-center py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
//           >
//             Call Now
//           </a>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default EmergencyBtn;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* About */}
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <span className="text-3xl">🏥</span>
//               <span className="text-xl font-bold text-white">MedCare</span>
//             </div>
//             <p className="text-gray-400">
//               Providing quality healthcare services with modern technology and experienced doctors.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
//               <li><Link to="/doctors" className="hover:text-blue-400">Doctors</Link></li>
//               <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
//               <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-center space-x-2">
//                 <FiPhone className="text-blue-400" />
//                 <span>+92 300 1234567</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <FiMail className="text-blue-400" />
//                 <span>info@medcare.com</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <FiMapPin className="text-blue-400" />
//                 <span>Lahore, Pakistan</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
//           <p>© {new Date().getFullYear()} MedCare Hospital. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import React from 'react';

// const Loader = () => {
//   return (
//     <div className="flex justify-center items-center min-h-[60vh]">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           <div className="w-8 h-8 border-4 border-blue-100 rounded-full animate-spin border-b-blue-500" style={{ animationDirection: 'reverse' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loader;



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
// import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

// const Navbar = () => {
//   const { user, logoutUser } = React.useContext(UserContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   // Change navbar background on scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     await logoutUser();
//     navigate('/login');
//   };

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//       scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl shadow-black/20 py-3' : 'bg-transparent py-5'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
//               M
//             </div>
//             <span className={`text-2xl font-black tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
//               Med<span className="text-blue-400">Care</span>
//             </span>
//           </Link>

//           {/* Desktop Links */}
//           <div className="hidden md:flex items-center space-x-1">
//             {['Home', 'Doctors', 'Dashboard'].map((item) => (
//               <Link
//                 key={item}
//                 to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
//                   scrolled ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
//                 }`}
//               >
//                 {item}
//               </Link>
//             ))}
//             {user?.role === 'admin' && (
//               <Link to="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-purple-300 bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-all">
//                 Admin
//               </Link>
//             )}
//           </div>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-3 bg-white/10 rounded-full py-1.5 pl-1.5 pr-4 border border-white/20 backdrop-blur-sm">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//                 <span className="text-sm font-medium text-white max-w-[100px] truncate">{user.name}</span>
//                 <button onClick={handleLogout} className="text-white/60 hover:text-red-400 transition-colors">
//                   <FiLogOut size={16} />
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className={`text-sm font-semibold transition-colors ${scrolled ? 'text-white hover:text-blue-300' : 'text-white/80 hover:text-white'}`}>
//                   Sign In
//                 </Link>
//                 <Link to="/register" className="px-6 py-2.5 text-sm font-bold text-slate-900 bg-white rounded-full hover:bg-blue-50 shadow-lg shadow-white/20 transition-all hover:scale-105">
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Button */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
//             {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
//             <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white rounded-xl hover:bg-white/10">Home</Link>
//             <Link to="/doctors" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white rounded-xl hover:bg-white/10">Doctors</Link>
//             {user ? (
//               <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 rounded-xl hover:bg-white/10 mt-2">Logout</button>
//             ) : (
//               <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center mt-4 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl">Get Started</Link>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserContext';
// import Loader from './Loader';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user, loading } = React.useContext(UserContext);

//   if (loading) {
//     return <Loader />;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && user.role !== 'admin') {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// // DoctorCard file code : 


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiMapPin, FiDollarSign } from 'react-icons/fi';

// const DoctorCard = ({ doctor }) => {
//   const { _id, specialization, fees, timing, days, user, isApproved } = doctor;

//   return (
//     <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover group">
//       {/* Top Color Bar */}
//       <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
      
//       <div className="p-6">
//         {/* Doctor Info */}
//         <div className="flex items-start space-x-4 mb-5">
//           <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-emerald-50 transition-colors">
//             👨‍⚕️
//           </div>
//           <div className="min-w-0">
//             <h3 className="font-bold text-slate-800 text-lg truncate">{user?.name || 'Doctor'}</h3>
//             <p className="text-emerald-600 text-sm font-medium">{specialization}</p>
//             <div className="flex items-center space-x-1 text-slate-400 text-xs mt-1">
//               <FiMapPin size={12} />
//               <span>{timing}</span>
//             </div>
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-2 gap-3 mb-5">
//           <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
//             <p className="text-xs text-slate-400 mb-0.5">Fee</p>
//             <p className="text-sm font-bold text-slate-700 flex items-center"><FiDollarSign size={14} className="text-emerald-500 mr-1"/>{fees} PKR</p>
//           </div>
//           <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
//             <p className="text-xs text-slate-400 mb-0.5">Status</p>
//             <p className={`text-sm font-bold ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
//               {isApproved ? '✓ Verified' : '⏳ Pending'}
//             </p>
//           </div>
//         </div>

//         {/* Available Days Pills */}
//         <div className="flex flex-wrap gap-1.5 mb-5">
//           {days?.slice(0, 4).map((day, index) => (
//             <span key={index} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg border border-slate-100 font-medium">
//               {day.slice(0, 3)}
//             </span>
//           ))}
//           {days?.length > 4 && <span className="text-xs text-slate-400 px-2 py-1">+{days.length - 4} more</span>}
//         </div>

//         {/* Action Button */}
//         {isApproved ? (
//           <Link
//             to={`/doctor/${_id}`}
//             className="block w-full py-3 text-center text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100"
//           >
//             View Profile
//           </Link>
//         ) : (
//           <button disabled className="block w-full py-3 text-center text-sm font-semibold text-slate-400 bg-slate-50 rounded-xl cursor-not-allowed border border-slate-100">
//             Currently Unavailable
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;


// // DashboardLayout.jsx file code :

// import React, { useState } from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { AppContext } from '../../context/AppContext';
// import {
//   LayoutDashboard, Users, Stethoscope, CalendarDays,
//   FileText, Settings, Sun, Moon, Menu, X, Bell,
//   UserCog, Heart
// } from 'lucide-react';

// const SidebarLink = ({ icon, label, to }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
//         ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
//         : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//       }`
//     }
//   >
//     {icon}
//     <span className="font-medium">{label}</span>
//   </NavLink>
// );

// const DashboardLayout = () => {
//   // ⬇️ ADD 'user' HERE SO WE CAN CHECK THEIR ROLE ⬇️
//   const { darkMode, toggleDarkMode, user } = React.useContext(AppContext);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate(); // ✅ ADDED THIS

//   const SidebarContent = () => (
//     <div className="flex flex-col h-full p-4">
//       {/* Logo */}
//       <div className="flex items-center space-x-2 mb-10 px-2">
//         <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/30">Z</div>
//         <span className="text-xl font-black text-slate-800 dark:text-white">ZH<span className="text-cyan-500">-Care</span></span>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 space-y-2">
//         <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
//         <SidebarLink to="/dashboard/doctors" icon={<Stethoscope size={20} />} label="Doctors List" />

//         {/* ============================== */}
//         {/* ⬇️ ADMIN ONLY FEATURE ⬇️ */}
//         {/* ============================== */}
//         {user?.role === 'admin' && (
//           <SidebarLink to="/dashboard/manage-users" icon={<UserCog size={20} />} label="Add Doctor/Patient" />
//         )}
//         {/* ============================== */}

//         {/* NORMAL USER FEATURES */}
//         <SidebarLink to="/dashboard/patients" icon={<Heart size={20} />} label="Patient Portal" />
//         <SidebarLink to="#" icon={<CalendarDays size={20} />} label="Appointments" />
//         <SidebarLink to="#" icon={<FileText size={20} />} label="Billing" />
//         <SidebarLink to="#" icon={<Settings size={20} />} label="Settings" />
//       </nav>

//       {/* User Profile at bottom */}
//       {/* User Profile at bottom right */}
//       <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
//         <div
//           onClick={() => {
//             if (!user) return navigate('/auth');

//             if (user.role === 'admin') return navigate('/admin');

//             if (user.role === 'doctor') return navigate(`/doctor/${user._id}`);

//             if (user.role === 'user') return navigate('/patient-profile');

//             return navigate('/dashboard');
//           }}
//           className="flex items-center space-x-3 px-2 py-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all group"
//         >
//           {/* Avatar */}
//           <div
//             className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${user?.role === 'doctor'
//                 ? 'bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-blue-500/30'
//                 : user?.role === 'admin'
//                   ? 'bg-gradient-to-tr from-purple-500 to-violet-500 shadow-purple-500/30'
//                   : 'bg-gradient-to-tr from-slate-400 to-slate-600 shadow-slate-400/30'
//               }`}
//           >
//             {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
//           </div>

//           {/* User Info */}
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
//               {user?.name || 'User'}
//             </p>

//             <div className="flex items-center space-x-1 text-xs text-slate-500">
//               <span className="font-medium capitalize">{user?.role || 'offline'}</span>

//               {/* Arrow Icon */}
//               <svg
//                 className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         initial={false}
//         className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//           }`}
//       >
//         <SidebarContent />
//       </motion.aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navbar */}
//         <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
//           <div className="flex items-center space-x-4">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 dark:text-slate-300">
//               <Menu size={24} />
//             </button>
//             <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 w-72">
//               <input type="text" placeholder="Search anything..." className="bg-transparent w-full outline-none text-sm text-slate-700 dark:text-slate-200" />
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-transform"
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>

//             <button className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform">
//               <Bell size={20} />
//               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
//             </button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-slate-950">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// // Auth.jsx file code :

// no code 


// // my Chatbot.jsx file code : 

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageCircle, X, Send } from 'lucide-react';
// import API from '../api/axios';
// import toast from 'react-hot-toast';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: 'AI Assistant', text: "Hello! I am ZH-Care AI. How can I assist you today?" }
//   ]);
//   const [msg, setMsg] = useState("");

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!msg.trim()) return;
    
//     setMsg("");
//     // Add user message to UI
//     setMessages(prev => [...prev, { from: 'You', text: msg }]);
    
//     try {
//       // Optional: Send to your backend if you build an AI endpoint
//       // const { data } = await API.post('/chatbot', { message: msg });
//       // setMessages(prev => [...prev, { from: 'AI', text: data.reply }]);
      
//       // For now, just show a fake AI reply
//       setTimeout(() => {
//         setMessages(prev => [...prev, { from: 'AI', text: "This is a demo reply. Connect an AI API later!" }]);
//       }, 1000);
//     } catch (error) {
//       console.error("Chatbot error:", error);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex justify-between items-center">
//               <div className="flex items-center space-x-2 font-bold">
//                 <MessageCircle className="text-xl" />
//                 <span>ZH-Care AI</span>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200 transition-colors">
//                 <X size={20} />
//               </button>
//             </div>
            
//             {/* Chat History */}
//             <div className="p-4 h-64 overflow-y-auto">
//               <div className="space-y-3">
//                 {messages.map((msg, i) => (
//                   <div key={i} className={`flex gap-2.5 ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`px-3 py-2.5 rounded-2xl max-w-[75%] text-sm ${
//                       msg.from === 'You' 
//                         ? 'bg-blue-600 text-white' 
//                         : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
//                     }`}>
//                       {msg.text}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Input */}
//             <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-700">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={msg}
//                   onChange={(e) => setMsg(e.target.value)}
//                   placeholder="Type a message..."
//                   className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//                 <button
//                   type="submit"
//                   className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   <Send size={18} />
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Action Button */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center text-white"
//       >
//         <MessageCircle className="text-3xl" />
//       </motion.button>
//     </div>
//   );
// };

// export default Chatbot;

// // EmergencyBtn.jsx file code :


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PhoneOff, Phone } from 'lucide-react';

// const EmergencyBtn = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.a
//             href="tel:911"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="mb-4 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-2xl shadow-red-500/50 flex items-center space-x-2 hover:bg-red-700"
//           >
//             <Phone size={20} /> <span>Call 911</span>
//           </motion.a>
//         )}
//       </AnimatePresence>
      
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-colors ${
//           isOpen ? 'bg-slate-700' : 'bg-red-600 animate-pulse shadow-red-500/50'
//         }`}
//       >
//         {isOpen ? <PhoneOff size={28} /> : <Phone size={28} />}
//       </motion.button>
//     </div>
//   );
// };

// export default EmergencyBtn;


// // AppContext.jsx file code :     


// import React, { createContext, useState, useEffect } from 'react';
// import API from '../api/axios';
// import toast from 'react-hot-toast';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [user, setUser] = useState(null);
//   const [users, setUsers] = useState([]); // ✅ all users
//   const [isAppLoading, setIsAppLoading] = useState(true);

//   // 🌙 Dark Mode
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//   }, [darkMode]);

//   // 👤 Logged-in user
//   const getProfile = async () => {
//     try {
//       const { data } = await API.get('/users/me/');
//       setUser(data.user);
//     } catch {
//       setUser(null);
//     }
//   };

//   // 👥 All users
//   const getAllUsers = async () => {
//     try {
//       const { data } = await API.get('/users/users');
//       setUsers(data.users);
//       console.log("Fetched Users:", data.users);
//     } catch (error) {
//       console.log("Users fetch error:", error);
//     }
//   };

//   // 🔄 Load everything
//   useEffect(() => {
//     const loadData = async () => {
//       await getProfile();
//       await getAllUsers();
//       setIsAppLoading(false);
//     };
//     loadData();
//   }, []);

//   // 🔐 Login
//   const loginUser = async (email, password) => {
//     try {
//       const { data } = await API.post('/users/login', { email, password });
//       setUser(data.user);
//       toast.success('Login Successful!');
//       return { success: true };
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Invalid credentials');
//       return { success: false };
//     }
//   };

//   // 📝 Register
//   const registerUser = async (name, email, password) => {
//     try {
//       const { data } = await API.post('/users/register', { name, email, password });
//       setUser(data.user);
//       toast.success('Account Created!');
//       return { success: true };
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration Failed');
//       return { success: false };
//     }
//   };

//   // 🚪 Logout
//   const logoutUser = async () => {
//     try {
//       await API.get('/users/logout');
//       setUser(null);
//       toast.success('Logged out!');
//     } catch {
//       toast.error('Logout failed');
//     }
//   };

//   return (
//     <AppContext.Provider value={{
//       darkMode,
//       toggleDarkMode: () => setDarkMode(!darkMode),
//       user,
//       users, // ✅ IMPORTANT
//       isAppLoading,
//       loginUser,
//       registerUser,
//       logoutUser
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };


// // my pages dashboard file code :

// // AdminDashboard,AdminManagements,PatientDashboard.jsx files code : 



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { AppContext } from '../../context/AppContext';
// import API from '../../api/axios';
// import { Users, DollarSign, BedDouble, TrendingUp } from 'lucide-react';

// const revenueData = [
//   { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 5000 },
//   { name: 'Apr', revenue: 4500 }, { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 5500 },
// ];
// const patientData = [
//   { name: 'Mon', pts: 40 }, { name: 'Tue', pts: 60 }, { name: 'Wed', pts: 30 },
//   { name: 'Thu', pts: 80 }, { name: 'Fri', pts: 70 }, { name: 'Sat', pts: 20 },
// ];

// const FAKE_STATS = {
//   users: '2,000+',
//   appointments: '12,500+',
//   revenue: '$1.2M+',
// };

// const AdminDashboard = () => {
// const { darkMode, user, users, isAppLoading } = React.useContext(AppContext);

//   const [stats, setStats] = useState({ users: 0, appointments: 0 });
//   const [appointments, setAppointments] = useState([]);

//   // ✅ FIX 1: Wait for user to be loaded before checking role
//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//   if (isAppLoading || !user || !isAdmin) return;

//   // ✅ Users already in context — no need to re-fetch!
//   const nonAdminUsers = users.filter(u => u.role !== 'admin');
//   setStats(prev => ({ ...prev, users: nonAdminUsers.length }));

//   // Only fetch appointments separately
//   const fetchAppointments = async () => {
//     try {
//       const appRes = await API.get('/appointments/admin/all');
//       setStats(prev => ({
//         ...prev,
//         appointments: appRes.data?.appointments?.length || 0,
//       }));
//       setAppointments(appRes.data?.appointments || []);
//     } catch (error) {
//       console.error('Appointments Fetch Error:', error.response?.data || error.message);
//     }
//   };

//   fetchAppointments();
// }, [isAdmin, isAppLoading, user, users]); // ✅ users added here

//   // Display values based on role
//   const displayUsers   = isAdmin ? stats.users        : FAKE_STATS.users;
//   const displayAppts   = isAdmin ? stats.appointments : FAKE_STATS.appointments;
//   const displayRevenue = isAdmin ? '$124.5k'          : FAKE_STATS.revenue;

//   const cardClass = `p-6 rounded-3xl ${darkMode
//     ? 'bg-slate-900 shadow-neu-dark border border-slate-800'
//     : 'bg-white shadow-neu-flat border border-slate-100'}`;

//   // ✅ FIX 6: Show loading while user role is being determined
//   if (isAppLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }


//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
//         <p className="text-slate-500 mt-1">
//           {isAdmin ? 'Live data from your database.' : 'Platform highlights at a glance.'}
//         </p>
//       </div>

//       {/* ===== STATS CARDS ===== */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//         {/* TOTAL USERS */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className={cardClass}>
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-slate-500 text-sm font-medium">Total Users</p>
//               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{displayUsers}</h3>
//               <p className="text-blue-500 text-sm font-semibold mt-2 flex items-center">
//                 <TrendingUp size={14} className="mr-1" />
//                 {isAdmin ? 'Live Data' : 'Growing Fast!'}
//               </p>
//             </div>
//             <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
//               <Users size={24} />
//             </div>
//           </div>
//         </motion.div>

//         {/* TOTAL APPOINTMENTS */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClass}>
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-slate-500 text-sm font-medium">Total Appointments</p>
//               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{displayAppts}</h3>
//               <p className="text-green-500 text-sm font-semibold mt-2 flex items-center">
//                 <TrendingUp size={14} className="mr-1" /> +12.5%
//               </p>
//             </div>
//             <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30">
//               <TrendingUp size={24} />
//             </div>
//           </div>
//         </motion.div>

//         {/* REVENUE */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-slate-500 text-sm font-medium">Revenue</p>
//               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">{displayRevenue}</h3>
//               <p className="text-purple-500 text-sm font-semibold mt-2 flex items-center">
//                 <TrendingUp size={14} className="mr-1" /> +8.2%
//               </p>
//             </div>
//             <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30">
//               <DollarSign size={24} />
//             </div>
//           </div>
//         </motion.div>

//         {/* BEDS */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-slate-500 text-sm font-medium">Beds Occupied</p>
//               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
//                 84<span className="text-lg text-slate-400 font-normal">/120</span>
//               </h3>
//               <p className="text-orange-500 text-sm font-semibold mt-2">70% Full</p>
//             </div>
//             <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30">
//               <BedDouble size={24} />
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ===== CHARTS ===== */}
//       <div className="grid lg:grid-cols-2 gap-8">
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Revenue Analytics</h3>
//           <div style={{ width: '100%', height: '256px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={revenueData}>
//                 <defs>
//                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
//                 <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#64748b'} />
//                 <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
//                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
//                 <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Patient Flow</h3>
//           <div style={{ width: '100%', height: '256px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={patientData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
//                 <XAxis dataKey="name" stroke={darkMode ? '#94a3b8' : '#64748b'} />
//                 <YAxis stroke={darkMode ? '#94a3b8' : '#64748b'} />
//                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
//                 <Bar dataKey="pts" fill="#3b82f6" radius={[10, 10, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>
//       </div>

//       {/* ===== APPOINTMENTS TABLE (Admin only) ===== */}
//       {isAdmin && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
//           className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <div className="p-6 border-b border-slate-100 dark:border-slate-800">
//             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm">
//                 <tr>
//                   <th className="px-6 py-4 font-medium">Patient</th>
//                   <th className="px-6 py-4 font-medium">Doctor</th>
//                   <th className="px-6 py-4 font-medium">Date</th>
//                   <th className="px-6 py-4 font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                 {appointments.length > 0 ? appointments.slice(0, 5).map((item) => (
//                   <tr key={item._id} className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
//                     <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.patient?.user?.name || 'Unknown'}</td>
//                     <td className="px-6 py-4 text-slate-500">{item.doctor?.user?.name || 'Unknown'}</td>
//                     <td className="px-6 py-4 text-slate-500">{new Date(item.date).toLocaleDateString()}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                         item.status === 'Approved' ? 'bg-green-100 text-green-700' :
//                         item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
//                       }`}>{item.status}</span>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">No appointments found</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AppContext } from '../../context/AppContext';
// import API from '../../api/axios';
// import toast from 'react-hot-toast';
// import { UserPlus, Stethoscope, Heart, ShieldCheck, X, Loader2 } from 'lucide-react';

// const AdminManageUsers = () => {
//   const { darkMode } = React.useContext(AppContext);
//   const [activeTab, setActiveTab] = useState('doctors');
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);

//   const [formData, setFormData] = useState({
//     name: '', email: '', password: '', 
//     specialization: '', contact: '', fees: '', timing: '9AM - 5PM', days: ['Monday', 'Tuesday'],
//     age: '', gender: 'male', disease: ''
//   });

//   useEffect(() => {
//     if (activeTab === 'roles') {
//       const fetchUsers = async () => {
//         const { data } = await API.get('/users/users');
//         setAllUsers(data.users);
//       };
//       fetchUsers();
//     }
//   }, [activeTab]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleCreateSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const endpoint = activeTab === 'doctors' ? '/users/admin/create-doctor' : '/patients/create';
    
//     const payload = {
//       ...formData,
//       age: formData.age ? parseInt(formData.age, 10) : 0
//     };

//     try {
//       const result = await API.post(endpoint, payload);
//       toast.success(`${activeTab === 'doctors' ? 'Doctor' : 'Patient'} created successfully!`);
//       setShowModal(false);
//       setFormData({ name: '', email: '', password: '', specialization: '', contact: '', fees: '', timing: '9AM - 5PM', days: ['Monday', 'Tuesday'], age: '', gender: 'male', disease: '' });
//     } catch (error) {
//       // ✅ ADDED: This will print the EXACT error from backend in your browser console (F12)
//       console.error("Backend Error Details:", error.response?.data);
      
//       toast.error(error.response?.data?.message || "Failed to create");
//     }
    
//     setLoading(false);
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       const result = await API.put(`/users/admin/update-role/${userId}`, { role: newRole });
//       if (result.data.success) {
//         let toastMessage = `Role changed to ${newRole}`;
//         if (newRole === 'doctor') {
//           toastMessage += "! A blank profile was created. Go to Doctors List to add their details.";
//         }
//         toast.success(toastMessage, { duration: 5000 });
//         setAllUsers(allUsers.map(u => u._id === userId ? { ...u, role: newRole } : u));
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change role");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Users</h1>
        
//         <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5">
//           {[
//             { id: 'doctors', label: 'Add Doctors', icon: <Stethoscope size={16} /> },
//             { id: 'patients', label: 'Add Patients', icon: <Heart size={16} /> },
//             { id: 'roles', label: 'Manage Roles', icon: <ShieldCheck size={16} /> },
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
//                 activeTab === tab.id ? 'bg-white dark:bg-slate-900 shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
//               }`}
//             >
//               {tab.icon} <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab !== 'roles' ? (
//         <div className={`p-8 rounded-3xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <UserPlus className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
//           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Create a new {activeTab === 'doctors' ? 'Doctor' : 'Patient'}</h3>
//           <p className="text-slate-500 mb-6 max-w-md mx-auto">This will create a new login account and link their medical profile automatically.</p>
//           <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
//             Create {activeTab === 'doctors' ? 'Doctor' : 'Patient'}
//           </button>
//         </div>
//       ) : (
//         <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <table className="w-full text-left">
//             <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm">
//               <tr>
//                 <th className="px-6 py-4 font-medium">User</th>
//                 <th className="px-6 py-4 font-medium">Email</th>
//                 <th className="px-6 py-4 font-medium">Current Role</th>
//                 <th className="px-6 py-4 font-medium">Change Role</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {allUsers.filter(u => u.role !== 'admin').map((user) => (
//                 <tr key={user._id} className="text-sm">
//                   <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{user.name}</td>
//                   <td className="px-6 py-4 text-slate-500">{user.email}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
//                       user.role === 'doctor' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
//                     }`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={user.role}
//                       onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                       className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none"
//                     >
//                       <option value="user">Patient (User)</option>
//                       <option value="doctor">Doctor</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-black text-slate-900 dark:text-white">
//                   New {activeTab === 'doctors' ? 'Doctor' : 'Patient'} Account
//                 </h2>
//                 <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
//               </div>

//               <form onSubmit={handleCreateSubmit} className="space-y-4">
                
//                 <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} value={formData.name} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                 <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} value={formData.email} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                 <input type="password" name="password" placeholder="Temporary Password" required minLength={8} onChange={handleChange} value={formData.password} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />

//                 {activeTab === 'doctors' && (
//                   <>
//                     <input type="text" name="specialization" placeholder="Specialization (e.g., Cardiologist)" required onChange={handleChange} value={formData.specialization} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                     <div className="grid grid-cols-2 gap-4">
//                       <input type="text" name="contact" placeholder="Contact Number" required onChange={handleChange} value={formData.contact} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                       <input type="number" name="fees" placeholder="Fee (Rs)" required onChange={handleChange} value={formData.fees} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>
//                     <input type="text" name="timing" placeholder="Timing (e.g., 9AM - 5PM)" required onChange={handleChange} value={formData.timing} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                   </>
//                 )}

//                 {activeTab === 'patients' && (
//                   <>
//                     <div className="grid grid-cols-3 gap-4">
//                       <input type="number" name="age" placeholder="Age" required onChange={handleChange} value={formData.age} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                       <select name="gender" onChange={handleChange} value={formData.gender} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500">
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                       <input type="text" name="contact" placeholder="Contact" required onChange={handleChange} value={formData.contact} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>
                    
//                     <input 
//                       type="text" 
//                       name="disease" 
//                       placeholder="Current Disease / Condition (REQUIRED)" 
//                       required 
//                       onChange={handleChange} 
//                       value={formData.disease} 
//                       className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-red-500 font-medium" 
//                     />
//                   </>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 disabled:opacity-70 transition-colors"
//                 >
//                   {loading ? <Loader2 size={20} className="animate-spin" /> : `Create ${activeTab === 'doctors' ? 'Doctor' : 'Patient'}`}
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AdminManageUsers;

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { AppContext } from '../../context/AppContext'; // MUST BE THIS
// import API from '../../api/axios'; // Import Axios
// import { FileText, Calendar, Pill, Heart, AlertCircle, Clock } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const PatientDashboard = () => {
//   const { darkMode } = React.useContext(AppContext);
  
//   // Real Data States
//   const [patientData, setPatientData] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch Real Data on Mount
//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const [patientRes, apptRes] = await Promise.all([
//           API.get('/patients/me'),
//           API.get('/appointments/my')
//         ]);
        
//         setPatientData(patientRes.data.patient);
//         setAppointments(apptRes.data.appointments || []);
//         setError(null);
//       } catch (err) {
//         // If 404, it means the user hasn't created their patient profile yet
//         setError("Patient profile not found. Please create your profile first.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Smart Health Score Calculation (Based on tracked history)
//   const calculateHealthScore = () => {
//     if (!patientData || !patientData.history) return 0;
//     const baseScore = 75;
//     const historyBonus = Math.min(patientData.history.length * 5, 25); // Max +25 points for records
//     return baseScore + historyBonus;
//   };

//   const healthScore = calculateHealthScore();

//   // Loading Skeleton UI
//   if (loading) {
//     return (
//       <div className="space-y-8">
//         <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
//         <div className="grid md:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Error State (Profile not created)
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
//         <AlertCircle size={60} className="text-red-400 mb-4" />
//         <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Profile Not Found</h2>
//         <p className="text-slate-500 mb-6 max-w-md">{error}</p>
//         <Link to="/patient-profile" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
//           Create Patient Profile
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 dark:text-white">
//             Welcome back, {patientData?.user?.name} 👋
//           </h1>
//           <p className="text-slate-500 mt-1">Here is your health overview.</p>
//         </div>
//         <Link 
//           to="/patient-profile" 
//           className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
//         >
//           Update Profile
//         </Link>
//       </div>
      
//       {/* Stats Grid - Real Data */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg mb-4">
//             <FileText size={24} />
//           </div>
//           <p className="text-slate-500 text-sm">Medical Records</p>
//           <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{patientData?.history?.length || 0} Files</h3>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg mb-4">
//             <Calendar size={24} />
//           </div>
//           <p className="text-slate-500 text-sm">Appointments</p>
//           <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{appointments.length} Upcoming</h3>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg mb-4">
//             <Pill size={24} />
//           </div>
//           <p className="text-slate-500 text-sm">Active Prescriptions</p>
//           <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{patientData?.medicines?.length || 0} Active</h3>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
//           className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-500 to-orange-500 text-white flex items-center justify-center shadow-lg mb-4">
//             <Heart size={24} />
//           </div>
//           <p className="text-slate-500 text-sm">Health Score</p>
//           <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{healthScore}/100</h3>
//         </motion.div>
//       </div>

//       {/* Health Timeline UI - Real Data from patientData.history */}
//       <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//         <div className="flex justify-between items-center mb-8">
//           <h3 className="text-xl font-bold text-slate-900 dark:text-white">Health Timeline</h3>
//           <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
//             Current: {patientData?.disease || "None"}
//           </span>
//         </div>
        
//         {patientData?.history && patientData.history.length > 0 ? (
//           <div className="relative">
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
            
//             {patientData.history.map((item, i) => (
//               <motion.div 
//                 key={i} 
//                 initial={{ opacity: 0, x: -20 }} 
//                 animate={{ opacity: 1, x: 0 }} 
//                 transition={{ delay: i * 0.15 }}
//                 className="relative flex items-start mb-8 last:mb-0"
//               >
//                 {/* Date Bubble */}
//                 <div className="w-16 h-16 rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white z-10 shadow-lg flex-shrink-0">
//                   <span className="text-[10px] font-bold uppercase">
//                     {new Date(item.treatmentDate).toLocaleString('en-US', { month: 'short' })}
//                   </span>
//                   <span className="text-lg font-black leading-tight">
//                     {new Date(item.treatmentDate).getDate()}
//                   </span>
//                 </div>
                
//                 {/* Event Card */}
//                 <div className="ml-6 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl flex-1 border border-slate-100 dark:border-slate-700">
//                   <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.disease || "General Checkup"}</h4>
//                   <div className="flex items-center space-x-2 text-slate-500 text-sm mt-1">
//                     <Clock size={14} />
//                     <span>{new Date(item.treatmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long' })}</span>
//                   </div>
//                   {item.notes && (
//                     <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
//                       📝 Doctor's Notes: {item.notes}
//                     </p>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 text-slate-400">
//             <FileText size={40} className="mx-auto mb-3 opacity-50" />
//             <p>No medical history recorded yet.</p>
//           </div>
//         )}
//       </div>

//       {/* Upcoming Appointments Table - Real Data */}
//       <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-neu-flat'}`}>
//         <div className="p-6 border-b border-slate-100 dark:border-slate-800">
//           <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Appointments</h3>
//         </div>
        
//         {appointments.length > 0 ? (
//           <table className="w-full text-left">
//             <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm">
//               <tr>
//                 <th className="px-6 py-4 font-medium">Doctor</th>
//                 <th className="px-6 py-4 font-medium">Date</th>
//                 <th className="px-6 py-4 font-medium">Time</th>
//                 <th className="px-6 py-4 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {appointments.map((apt) => (
//                 <tr key={apt._id} className="text-sm">
//                   <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
//                     {apt.doctor?.user?.name || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 text-slate-500">
//                     {new Date(apt.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-slate-500">{apt.time}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       apt.status === 'Approved' ? 'bg-green-100 text-green-700' : 
//                       apt.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {apt.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-center py-12 text-slate-400">
//             <Calendar size={40} className="mx-auto mb-3 opacity-50" />
//             <p>No upcoming appointments.</p>
//             <Link to="/doctors" className="text-blue-500 font-semibold text-sm hover:underline mt-2 inline-block">Book an Appointment</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;


// // and my some pages files code : 

// import React, { useState, useEffect } from 'react';
// import API from '../api/axios';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import Loader from '../components/common/Loader';
// import { toast } from 'react-toastify';

// const AdminAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState('');

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const { data } = await API.get('/appointments/admin/all');
//       setAppointments(data.appointments);
//     } catch (error) {
//       toast.error('Failed to fetch appointments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await API.put(`/appointments/admin/update/${id}`, { status });
//       toast.success(`Status updated to ${status}`);
//       fetchAppointments();
//     } catch (error) {
//       toast.error('Failed to update status');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this appointment?')) {
//       try {
//         await API.delete(`/appointments/admin/delete/${id}`);
//         toast.success('Appointment deleted');
//         fetchAppointments();
//       } catch (error) {
//         toast.error('Failed to delete appointment');
//       }
//     }
//   };

//   const filteredAppointments = filterStatus
//     ? appointments.filter(a => a.status === filterStatus)
//     : appointments;

//   const statusColors = {
//     Pending: 'bg-yellow-100 text-yellow-700',
//     Approved: 'bg-green-100 text-green-700',
//     Rejected: 'bg-red-100 text-red-700',
//     Completed: 'bg-blue-100 text-blue-700',
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
      
//       <main className="ml-64 p-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <h1 className="text-3xl font-bold text-gray-800">Manage Appointments</h1>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Appointments Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Doctor</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredAppointments.map((appointment) => (
//                   <tr key={appointment._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="font-medium">{appointment.patient?.user?.name || 'N/A'}</p>
//                         <p className="text-sm text-gray-500">{appointment.patient?.user?.email}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="font-medium">{appointment.doctor?.user?.name || 'N/A'}</p>
//                         <p className="text-sm text-gray-500">{appointment.doctor?.specialization}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       {new Date(appointment.date).toLocaleDateString('en-PK', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                       })}
//                     </td>
//                     <td className="px-6 py-4">{appointment.time}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-xs ${statusColors[appointment.status]}`}>
//                         {appointment.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex space-x-1">
//                         {appointment.status === 'Pending' && (
//                           <>
//                             <button
//                               onClick={() => handleStatusUpdate(appointment._id, 'Approved')}
//                               className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => handleStatusUpdate(appointment._id, 'Rejected')}
//                               className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                               Reject
//                             </button>
//                           </>
//                         )}
//                         {appointment.status === 'Approved' && (
//                           <button
//                             onClick={() => handleStatusUpdate(appointment._id, 'Completed')}
//                             className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
//                           >
//                             Complete
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleDelete(appointment._id)}
//                           className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredAppointments.length === 0 && (
//             <div className="text-center py-12 text-gray-500">No appointments found</div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminAppointments;


// import React, { useState, useEffect } from 'react';
// import API from '../api/axios';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import Loader from '../components/common/Loader';
// import { toast } from 'react-toastify';
// import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

// const AdminDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState(null);
//   const [formData, setFormData] = useState({
//     specialization: '',
//     contact: '',
//     fees: '',
//     days: [],
//     timing: '',
//   });

//   const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const { data } = await API.get('/doctors');
//       setDoctors(data.doctors);
//     } catch (error) {
//       toast.error('Failed to fetch doctors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDayToggle = (day) => {
//     setFormData(prev => ({
//       ...prev,
//       days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
//     }));
//   };

//   const resetForm = () => {
//     setFormData({ specialization: '', contact: '', fees: '', days: [], timing: '' });
//     setEditingDoctor(null);
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/doctors/create', formData);
//       toast.success('Doctor created successfully!');
//       setShowModal(false);
//       resetForm();
//       fetchDoctors();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create doctor');
//     }
//   };

//   const handleEdit = (doctor) => {
//     setEditingDoctor(doctor);
//     setFormData({
//       specialization: doctor.specialization,
//       contact: doctor.contact,
//       fees: doctor.fees,
//       days: doctor.days || [],
//       timing: doctor.timing,
//     });
//     setShowModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/doctors/${editingDoctor._id}`, formData);
//       toast.success('Doctor updated successfully!');
//       setShowModal(false);
//       resetForm();
//       fetchDoctors();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to update doctor');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this doctor?')) {
//       try {
//         await API.delete(`/doctors/${id}`);
//         toast.success('Doctor deleted successfully!');
//         fetchDoctors();
//       } catch (error) {
//         toast.error('Failed to delete doctor');
//       }
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
      
//       <main className="ml-64 p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Manage Doctors</h1>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowModal(true);
//             }}
//             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiPlus />
//             <span>Add Doctor</span>
//           </button>
//         </div>

//         {/* Doctors Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Specialization</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fees</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {doctors.map((doctor) => (
//                 <tr key={doctor._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">{doctor.user?.name}</td>
//                   <td className="px-6 py-4">{doctor.specialization}</td>
//                   <td className="px-6 py-4">{doctor.contact}</td>
//                   <td className="px-6 py-4">Rs. {doctor.fees}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       doctor.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {doctor.isApproved ? 'Verified' : 'Pending'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(doctor)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                       >
//                         <FiEdit2 />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(doctor._id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {doctors.length === 0 && (
//             <div className="text-center py-12 text-gray-500">No doctors found</div>
//           )}
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">
//                   {editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
//                 </h2>
//                 <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
//                   <FiX size={24} />
//                 </button>
//               </div>

//               <form onSubmit={editingDoctor ? handleUpdate : handleCreate} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
//                   <input
//                     type="text"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                   <input
//                     type="text"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Fees (Rs.)</label>
//                   <input
//                     type="number"
//                     name="fees"
//                     value={formData.fees}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
//                   <input
//                     type="text"
//                     name="timing"
//                     value={formData.timing}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., 9:00 AM - 5:00 PM"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
//                   <div className="flex flex-wrap gap-2">
//                     {dayOptions.map((day) => (
//                       <button
//                         key={day}
//                         type="button"
//                         onClick={() => handleDayToggle(day)}
//                         className={`px-3 py-1 rounded-full text-sm border transition-colors ${
//                           formData.days.includes(day)
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
//                         }`}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   {editingDoctor ? 'Update Doctor' : 'Create Doctor'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDoctors;

// import React, { useState, useEffect } from 'react';
// import API from '../api/axios';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import Loader from '../components/common/Loader';
// import { toast } from 'react-toastify';
// import { FiTrash2, FiSearch } from 'react-icons/fi';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await API.get('/users/users');
//       setUsers(data.users);
//     } catch (error) {
//       toast.error('Failed to fetch users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await API.delete(`/users/user/${id}`);
//         toast.success('User deleted successfully!');
//         fetchUsers();
//       } catch (error) {
//         toast.error('Failed to delete user');
//       }
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const roleColors = {
//     admin: 'bg-purple-100 text-purple-700',
//     doctor: 'bg-green-100 text-green-700',
//     user: 'bg-blue-100 text-blue-700',
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
      
//       <main className="ml-64 p-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Joined</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 font-medium">{user.name}</td>
//                     <td className="px-6 py-4 text-gray-600">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-xs capitalize ${roleColors[user.role]}`}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {new Date(user.createdAt).toLocaleDateString('en-PK', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                       })}
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                         title="Delete User"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredUsers.length === 0 && (
//             <div className="text-center py-12 text-gray-500">No users found</div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminUsers;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPass, setShowPass] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
  
//   // Form State
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//   const { loginUser, registerUser } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitLoading(true);

//     let result;
    
//     if (isLogin) {
//       // Call your backend login API
//       result = await loginUser(formData.email, formData.password);
//     } else {
//       // Call your backend register API
//       result = await registerUser(formData.name, formData.email, formData.password);
//     }

//     if (result.success) {
//       navigate('/dashboard'); // Go to dashboard if successful
//     }
    
//     setSubmitLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex bg-white dark:bg-slate-950">
      
//       {/* LEFT SIDE - FORM */}
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
//             {isLogin ? 'Welcome back' : 'Create account'}
//           </h2>
//           <p className="text-slate-500 mb-8">
//             {isLogin ? 'Enter your credentials to access your dashboard' : 'Enter details to start your free trial'}
//           </p>

//           <form className="space-y-6" onSubmit={handleSubmit}>
            
//             {/* Show Name field ONLY if Sign Up */}
//             {!isLogin && (
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input 
//                   type="text" 
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Full Name" 
//                   className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
//                 />
//               </div>
//             )}
            
//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//               <input 
//                 type="email" 
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Email Address" 
//                 className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//               <input 
//                 type={showPass ? "text" : "password"} 
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 minLength={8}
//                 placeholder="Min 8 characters" 
//                 className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
//               />
//               <button 
//                 type="button" 
//                 onClick={() => setShowPass(!showPass)} 
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
//               >
//                 {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {/* MAIN SUBMIT BUTTON */}
//             <button
//               type="submit"
//               disabled={submitLoading}
//               className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-70"
//             >
//               {submitLoading ? (
//                 <Loader2 size={22} className="animate-spin" /> // Spinning loader when calling API
//               ) : (
//                 <>
//                   <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
//                   <ArrowRight size={20} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* TOGGLE SIGN UP / SIGN IN BUTTON */}
//           <p className="mt-8 text-center text-slate-500 text-sm">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button 
//               type="button"
//               onClick={() => setIsLogin(!isLogin)} 
//               className="ml-2 text-blue-600 font-bold hover:underline cursor-pointer"
//             >
//               {isLogin ? 'Sign Up' : 'Sign In'}
//             </button>
//           </p>
//         </div>
//       </div>

//       {/* RIGHT SIDE - VISUAL */}
//       <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
//         <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
//           <h1 className="text-5xl font-black mb-6">Manage Everything<br />In One Place.</h1>
//           <p className="text-xl text-blue-100 max-w-md">Experience the future of hospital management with AI-powered tools.</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Auth;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import API from '../api/axios';
// import Loader from '../components/common/Loader';
// import { toast } from 'react-toastify';
// import { FiCalendar, FiClock, FiArrowLeft, FiCheck } from 'react-icons/fi';

// const BookAppointment = () => {
//   const { doctorId } = useParams();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useState({ date: '', time: '' });

//   useEffect(() => { fetchDoctorDetails(); }, [doctorId]);

//   const fetchDoctorDetails = async () => {
//     try {
//       const { data } = await API.get(`/doctors/${doctorId}`);
//       setDoctor(data.doctor);
//     } catch (error) { toast.error('Failed to load doctor'); }
//     finally { setLoading(false); }
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dayName = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' });
//     if (doctor.days && !doctor.days.includes(dayName) && !doctor.days.includes(dayName.toLowerCase())) {
//       toast.error(`Doctor is not available on ${dayName}`);
//       return;
//     }
//     setSubmitting(true);
//     try {
//       await API.post('/appointments/create', { doctor: doctorId, ...formData });
//       toast.success('Appointment Booked!');
//       navigate('/my-appointments');
//     } catch (error) { toast.error(error.response?.data?.message || 'Booking failed'); }
//     finally { setSubmitting(false); }
//   };

//   const today = new Date().toISOString().split('T')[0];

//   if (loading) return <Loader />;
//   if (!doctor) return <div className="p-8 text-center">Doctor not found</div>;

//   return (
//     <div className="min-h-screen bg-slate-50 py-10">
//       <div className="max-w-3xl mx-auto px-4">
//         <Link to={`/doctor/${doctorId}`} className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-800 mb-8 text-sm font-medium">
//           <FiArrowLeft /> <span>Back to Doctor Profile</span>
//         </Link>

//         <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
//           {/* Doctor Summary Header */}
//           <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 flex items-center space-x-4">
//             <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/30">👨‍⚕️</div>
//             <div className="text-white">
//               <h2 className="text-xl font-bold">{doctor.user?.name}</h2>
//               <p className="text-emerald-100 text-sm">{doctor.specialization} • Rs. {doctor.fees}</p>
//             </div>
//           </div>

//           {/* Form Body */}
//           <form onSubmit={handleSubmit} className="p-8 space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   <FiCalendar className="inline mr-2 text-emerald-500" />Preferred Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   min={today}
//                   required
//                   className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-slate-700"
//                 />
//                 <p className="text-xs text-slate-400 mt-1.5">Available: {doctor.days?.join(', ')}</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   <FiClock className="inline mr-2 text-emerald-500" />Preferred Time
//                 </label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-slate-700"
//                 />
//                 <p className="text-xs text-slate-400 mt-1.5">Timing: {doctor.timing}</p>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200 hover:shadow-emerald-300 flex items-center justify-center space-x-2 disabled:opacity-50"
//             >
//               {submitting ? 'Processing...' : <><FiCheck size={20} /> <span>Confirm Appointment</span></>}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;


// import React, { useState } from 'react';
// import { UserContext } from '../context/UserContext';
// import { FiLock } from 'react-icons/fi';

// const ChangePassword = () => {
//   const { updatePassword } = React.useContext(UserContext);
//   const [formData, setFormData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmNewPassword: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmNewPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     if (formData.newPassword.length < 8) {
//       alert('New password must be at least 8 characters');
//       return;
//     }

//     setLoading(true);
//     await updatePassword(formData);
//     setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-md mx-auto px-4">
//         <div className="text-center mb-8">
//           <FiLock className="mx-auto text-4xl text-blue-600" />
//           <h1 className="mt-4 text-3xl font-bold text-gray-800">Change Password</h1>
//           <p className="text-gray-600 mt-2">Update your account password</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
//             <input
//               type="password"
//               name="oldPassword"
//               value={formData.oldPassword}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               required
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//             <input
//               type="password"
//               name="confirmNewPassword"
//               value={formData.confirmNewPassword}
//               onChange={handleChange}
//               required
//               minLength={8}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//           >
//             {loading ? 'Updating...' : 'Update Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import API from '../api/axios';
// import { UserContext } from '../context/UserContext';
// import Loader from '../components/common/Loader';
// import { FiClock, FiDollarSign, FiPhone, FiCalendar, FiArrowLeft } from 'react-icons/fi';

// const DoctorDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = React.useContext(UserContext);
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctorDetails();
//   }, [id]);

//   const fetchDoctorDetails = async () => {
//     try {
//       const { data } = await API.get(`/doctors/${id}`);
//       setDoctor(data.doctor);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   if (!doctor) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="text-center">
//           <span className="text-6xl">😕</span>
//           <p className="mt-4 text-gray-500">Doctor not found</p>
//           <Link to="/doctors" className="text-blue-600 hover:underline mt-2 inline-block">
//             Back to Doctors
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6"
//         >
//           <FiArrowLeft />
//           <span>Back</span>
//         </button>

//         {/* Doctor Card */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white">
//             <div className="flex flex-col sm:flex-row items-center gap-6">
//               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-5xl">👨‍⚕️</span>
//               </div>
//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold">{doctor.user?.name}</h1>
//                 <p className="text-blue-100 text-lg mt-1">{doctor.specialization}</p>
//                 <p className="text-blue-200 text-sm mt-2">{doctor.user?.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="p-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiDollarSign className="text-green-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Consultation Fee</p>
//                   <p className="font-semibold text-lg">Rs. {doctor.fees}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiClock className="text-blue-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Timing</p>
//                   <p className="font-semibold">{doctor.timing}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiPhone className="text-purple-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Contact</p>
//                   <p className="font-semibold">{doctor.contact}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiCalendar className="text-orange-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Available Days</p>
//                   <p className="font-semibold">{doctor.days?.join(', ')}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg mb-6">
//               <div>
//                 <span className="text-yellow-700 font-medium">
//                   {doctor.isApproved ? '✓ Verified Doctor' : '⏳ Verification Pending'}
//                 </span>
//               </div>
//             </div>

//             {/* Book Button */}
//             {user && doctor.isApproved && (
//               <Link
//                 to={`/book-appointment/${doctor._id}`}
//                 className="block w-full py-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Book Appointment
//               </Link>
//             )}

//             {!user && (
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-gray-600">
//                   Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> to book an appointment
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import API from '../api/axios';
// import { 
//   Calendar, Clock, DollarSign, MapPin, Phone, 
//   CheckCircle, XCircle, ArrowLeft, Loader2 
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { AppContext } from '../context/AppContext';

// const DoctorProfile = () => {
//   const { user } = React.useContext(UserContext);
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [formData, setFormData] = useState({ date: '', time: '' });
  
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const { data } = await API.get(`/doctors/${id}/`);
//         setDoctor(data.doctor);
//       } catch (error) {
//         toast.error("Failed to load doctor profile");
//         navigate('/doctors');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctor();
//   }, [id, navigate]);

//   const handleBookAppointment = async (e) => {
//     e.preventDefault();
    
//     // Check if user is logged in
//     if (!user) {
//       toast.error("Please login to book an appointment");
//       return navigate('/auth');
//     }

//     // Optional: Check if user is a doctor (doctors shouldn't book appointments with other doctors easily)
//     if (user.role === 'doctor') {
//       toast.error("Doctors cannot book appointments with other doctors through this portal.");
//       return;
//     }

//     // Check if selected day is available
//     const selectedDate = new Date(formData.date);
//     const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    
//     if (doctor.days && !doctor.days.includes(dayName) && !doctor.days.includes(dayName.toLowerCase())) {
//       toast.error(`Dr. ${doctor.user?.name} is not available on ${dayName}`);
//       return;
//     }

//     setBookingLoading(true);
//     try {
//       await API.post('/appointments/create/', {
//         doctor: id,
//         date: formData.date,
//         time: formData.time,
//       });
      
//       toast.success("Appointment booked successfully!");
//       navigate('/my-appointments');
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to book appointment");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 className="animate-spin text-blue-500" size={50} /></div>;
//   if (!doctor) return <div className="flex justify-center items-center min-h-[60vh] text-center px-4"><div><span className="text-6xl">😕</span><h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-4">Doctor Not Found</h2><Link to="/doctors" className="text-blue-500 hover:underline mt-4 inline-block">Back to Doctors</Link></div></div>;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
//       {/* Header Section with Gradient Background */}
//       <div className="relative h-80 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
//           {/* Back Button */}
//           <button onClick={() => navigate(-1)} className="absolute top-6 left-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all">
//             <ArrowLeft size={24} />
//           </button>

//           {/* Doctor Info Card */}
//           <div className="flex flex-col md:flex-row items-end md:gap-8 w-full">
//             {/* Avatar */}
//             <div className="flex-shrink-0 mb-6 md:mb-0">
//               <div className="w-32 h-32 md:w-40 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-6xl shadow-2xl">
//                 {doctor.avatar?.url && !doctor.avatar.url.includes('default') ? (
//                   <img src={doctor.avatar.url} alt={doctor.user?.name} className="w-full h-full object-cover rounded-2xl" />
//                 ) : (
//                   <span className="text-6xl">👨‍⚕️</span>
//                 )}
//               </div>
//             </div>
            
//             {/* Name & Spec */}
//             <div className="text-white text-center md:text-left mb-6">
//               <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
//                 {doctor.isApproved ? (
//                   <span className="text-xs font-bold text-green-300 flex items-center"><CheckCircle size={14} className="mr-1" /> Verified Doctor</span>
//                 ) : (
//                   <span className="text-xs font-bold text-yellow-300 flex items-center"><Clock size={14} className="mr-1" /> Pending Approval</span>
//                 )}
//               </div>
//               <h1 className="text-3xl md:text-5xl font-black drop-shadow-lg">{doctor.user?.name}</h1>
//               <p className="text-xl text-blue-100 font-medium mt-1">{doctor.specialization}</p>
//               <p className="text-blue-200 text-sm mt-2">{doctor.user?.email}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-16">
//         <div className="grid md:grid-cols-3 gap-6">
          
//           {/* Info Cards */}
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 card-hover">
//             <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
//               <DollarSign size={28} />
//             </div>
//             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Consultation Fee</h3>
//             <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">Rs. {doctor.fees}</p>
//             <p className="text-slate-500 text-sm mt-1">Per session</p>
//           </div>

//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 card-hover">
//             <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
//               <Clock size={28} />
//             </div>
//             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Timing</h3>
//             <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{doctor.timing}</p>
//           </div>

//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6 card-hover">
//             <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
//               <MapPin size={28} />
//             </div>
//             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Contact</h3>
//             <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{doctor.contact}</p>
//           </div>
//         </div>

//         {/* Available Days */}
//         <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-8 mt-6">
//           <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center">
//             <Calendar className="mr-2 text-blue-500" size={22} /> Available Days
//           </h3>
//           {doctor.days && doctor.days.length > 0 ? (
//             <div className="flex flex-wrap gap-3 justify-center">
//               {doctor.days.map((day) => (
//                 <span 
//                   key={day} 
//                   className="px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold border border-blue-200 dark:border-blue-800"
//                 >
//                   {day}
//                 </span>
//               ))}
//             </div>
//           ) : (
//             <p className="text-slate-400 text-center py-4">No available days added yet.</p>
//           )}
//         </div>

//         {/* Appointment Booking Section */}
//         {user?.role !== 'doctor' && (
//           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-8 mt-6">
//             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
//               <Calendar className="mr-2 text-blue-600" size={22} /> Book an Appointment
//             </h3>
//             <p className="text-slate-500 text-center mb-8">Select your preferred date and time to consult with Dr. {doctor.user?.name}</p>
            
//             <form onSubmit={handleBookAppointment} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Date</label>
//                 <input
//                   type="date"
//                   value={formData.date}
//                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                   min={today}
//                   required
//                   className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Time</label>
//                 <input
//                   type="time"
//                   value={formData.time}
//                   onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                   required
//                   className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={bookingLoading}
//                 className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 disabled:opacity-50 transition-colors"
//               >
//                 {bookingLoadin ? (
//                   <div className="w-6 h-6 border-4 border-white/30 border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <Calendar size={20} />
//                     <span>Book Appointment</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             {user ? (
//               <p className="text-center text-xs text-slate-400 mt-6">
//                 Booking as <span className="font-bold text-blue-600">{user.name}</span>
//               </p>
//             ) : (
//               <div className="text-center bg-blue-50 dark:bg-slate-800 rounded-xl p-4 mt-6">
//                 <p className="text-sm text-slate-600">Please <Link to="/auth" className="text-blue-600 font-semibold hover:underline">Login</Link> to book an appointment.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;


// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import API from '../api/axios';
// import DoctorCard from '../components/doctor/DoctorCard';
// import Loader from '../components/common/Loader';
// import { FiSearch, FiFilter } from 'react-icons/fi';

// const Doctors = () => {
//   const [searchParams] = useSearchParams();
//   const initialSearch = searchParams.get('search') || "";
  
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(initialSearch);
//   const [filterSpec, setFilterSpec] = useState('');

//   useEffect(() => { fetchDoctors(); }, []);

//   const fetchDoctors = async () => {
//     try {
//       const { data } = await API.get('/doctors');
//       setDoctors(data.doctors);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredDoctors = doctors.filter((doctor) => {
//     const nameMatch = doctor.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const specMatch = filterSpec === '' || doctor.specialization?.toLowerCase().includes(filterSpec.toLowerCase());
//     return nameMatch && specMatch;
//   });

//   const specializations = [...new Set(doctors.map((d) => d.specialization).filter(Boolean))];

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-slate-50 py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800">Find Your Doctor</h1>
//           <p className="text-slate-500 mt-1">Browse through our expert specialists</p>
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8 flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search by doctor name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
//             />
//           </div>
//           <div className="relative">
//             <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//             <select
//               value={filterSpec}
//               onChange={(e) => setFilterSpec(e.target.value)}
//               className="pl-11 pr-8 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm appearance-none cursor-pointer text-slate-600 min-w-[200px]"
//             >
//               <option value="">All Specializations</option>
//               {specializations.map((spec) => (
//                 <option key={spec} value={spec}>{spec}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Grid */}
//         {filteredDoctors.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredDoctors.map((doctor) => (
//               <DoctorCard key={doctor._id} doctor={doctor} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
//             <span className="text-6xl block mb-4">🔍</span>
//             <h3 className="text-xl font-semibold text-slate-700">No Doctors Found</h3>
//             <p className="text-slate-500 mt-1">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doctors;



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AppContext } from '../context/AppContext';
// import API from '../api/axios';
// import toast from 'react-hot-toast';
// import { Search, CheckCircle, XCircle, X, Loader2 } from 'lucide-react';

// const DoctorsList = () => {
//   const { darkMode } = React.useContext(AppContext);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Modal State
//   const [showModal, setShowModal] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [setupData, setSetupData] = useState({
//     specialization: '',
//     contact: '',
//     fees: '',
//     timing: '',
//     days: []
//   });

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const { data } = await API.get('/doctors/');
//       setDoctors(data.doctors);
//     } catch (error) {
//       toast.error("Failed to fetch doctors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchDoctors(); }, []);

//   // Open Modal & Pre-fill Data
//   const openSetupModal = (doc) => {
//     setSelectedDoc(doc);
//     setSetupData({
//       specialization: doc.specialization || '',
//       contact: doc.contact || '',
//       fees: doc.fees || '',
//       timing: doc.timing || '',
//       days: doc.days || []
//     });
//     setShowModal(true);
//   };

//   // Save Info AND Approve in one single request
//   const handleSetupAndApprove = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       // We send setupData AND isApproved: true at the same time!
//       await API.put(`/doctors/${selectedDoc._id}/`, {
//         ...setupData,
//         fees: Number(setupData.fees), // Ensure fees is a number
//         isApproved: true
//       });

//       toast.success("Doctor details saved & approved successfully!");
//       setShowModal(false);
//       fetchDoctors(); // Refresh list to show updated data
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Reject (Delete from DB)
//   const handleReject = async (docId) => {
//     const confirmDelete = window.confirm("Are you sure you want to reject and delete this doctor?");
//     if (!confirmDelete) return;

//     try {
//       await API.delete(`/doctors/${docId}/`);
//       toast.success("Doctor rejected and removed.");
//       setDoctors(doctors.filter(doc => doc._id !== docId));
//     } catch (error) {
//       toast.error("Failed to reject");
//     }
//   };

//   const handleDayToggle = (day) => {
//     setSetupData(prev => ({
//       ...prev,
//       days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
//     }));
//   };

//   if (loading) return <div className="text-center py-20 text-slate-500">Loading doctors...</div>;

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Doctors</h1>
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//           <input type="text" placeholder="Search doctors..." className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8">
//         {doctors.map((doc, i) => (
//           <motion.div
//             key={doc._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             whileHover={{ y: -10 }}
//             className={`p-6 rounded-3xl border text-center group cursor-pointer transition-all ${
//               doc.isApproved 
//                 ? `${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}` 
//                 : `${darkMode ? 'bg-red-950/30 border-red-800/50' : 'bg-red-50 border-red-200'}`
//             }`}
//           >
//             <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👨‍⚕️</div>
//             <h3 className="text-xl font-bold text-slate-900 dark:text-white">{doc.user?.name}</h3>
//             <p className={`font-medium mt-1 ${doc.specialization !== 'Not Assigned' ? 'text-cyan-600' : 'text-slate-400 italic'}`}>
//               {doc.specialization}
//             </p>
            
//             <div className="flex items-center justify-center space-x-1 mt-3 text-slate-500 text-sm">
//               <span>Rs. {doc.fees}</span>
//               <span>•</span>
//               <span>{doc.timing}</span>
//             </div>

//             <div className="mt-5 mb-5 flex justify-center">
//               <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
//                 doc.isApproved 
//                   ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
//                   : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse'
//               }`}>
//                 {doc.isApproved ? '✓ VERIFIED' : '⏳ PENDING SETUP'}
//               </span>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex space-x-2">
//               {doc.isApproved ? (
//                 <button onClick={() => handleReject(doc._id)} className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all">
//                   <XCircle size={16} /><span>Reject</span>
//                 </button>
//               ) : (
//                 <button onClick={() => openSetupModal(doc)} className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">
//                   <CheckCircle size={16} /><span>Setup & Approve</span>
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* ==================== SETUP & APPROVE MODAL ==================== */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-slate-200 dark:border-slate-800"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h2 className="text-2xl font-black text-slate-900 dark:text-white">Setup Doctor</h2>
//                   <p className="text-sm text-slate-500 mt-1">Approving: {selectedDoc?.user?.name}</p>
//                 </div>
//                 <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
//               </div>

//               <form onSubmit={handleSetupAndApprove} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Specialization *</label>
//                   <input type="text" name="specialization" required value={setupData.specialization} onChange={(e) => setSetupData({...setupData, specialization: e.target.value})} placeholder="e.g., Cardiologist" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact *</label>
//                     <input type="text" name="contact" required value={setupData.contact} onChange={(e) => setSetupData({...setupData, contact: e.target.value})} placeholder="03XX-XXXXXXX" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Fees (Rs) *</label>
//                     <input type="number" name="fees" required value={setupData.fees} onChange={(e) => setSetupData({...setupData, fees: e.target.value})} placeholder="1500" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Timing *</label>
//                   <input type="text" name="timing" required value={setupData.timing} onChange={(e) => setSetupData({...setupData, timing: e.target.value})} placeholder="e.g., 9:00 AM - 5:00 PM" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Available Days *</label>
//                   <div className="flex flex-wrap gap-2">
//                     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
//                       <button
//                         key={day}
//                         type="button"
//                         onClick={() => handleDayToggle(day)}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
//                           setupData.days.includes(day)
//                             ? 'bg-blue-600 text-white border-blue-600'
//                             : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:border-blue-300'
//                         }`}
//                       >
//                         {day.slice(0, 3)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30 disabled:opacity-50 transition-colors"
//                 >
//                   {saving ? <Loader2 size={20} className="animate-spin" /> : <><CheckCircle size={20} /><span>Save Details & Approve Doctor</span></>}
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default DoctorsList;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { FiMail, FiArrowLeft } from 'react-icons/fi';

// const ForgotPassword = () => {
//   const { forgotPassword } = React.useContext(UserContext);
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await forgotPassword(email);
//     setLoading(false);
//     if (result.success) {
//       setSent(true);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full">
//         <Link to="/login" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6">
//           <FiArrowLeft />
//           <span>Back to Login</span>
//         </Link>

//         <div className="text-center mb-8">
//           <span className="text-5xl">🔐</span>
//           <h2 className="mt-4 text-3xl font-bold text-gray-800">Forgot Password</h2>
//           <p className="mt-2 text-gray-600">Enter your email to reset password</p>
//         </div>

//         {sent ? (
//           <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//             <span className="text-5xl">📧</span>
//             <h3 className="mt-4 text-xl font-semibold text-gray-800">Email Sent!</h3>
//             <p className="mt-2 text-gray-600">
//               Check your inbox and follow the instructions to reset your password.
//             </p>
//             <Link
//               to="/login"
//               className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Back to Login
//             </Link>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Sending...' : 'Send Reset Link'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiSearch, FiArrowRight, FiShield, FiHeart, FiActivity } from 'react-icons/fi';

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/doctors?search=${searchQuery}`);
//   };

//   return (
//     <div className="overflow-hidden">
      
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop')" }}>
//         </div>
//         {/* Dark Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>

//         {/* Floating Decorative Circles */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

//         {/* Content */}
//         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center animate-fade-in-up">
//           <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium text-blue-200 mb-8">
//             <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
//             Trusted by 10,000+ Patients Nationwide
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
//             Next-Gen<br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
//               Healthcare
//             </span> Solutions
//           </h1>
          
//           <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
//             Experience seamless doctor consultations, digital records, and instant appointments—all wrapped in a beautiful, modern interface.
//           </p>

//           {/* Premium Search Bar */}
//           <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/20 shadow-2xl">
//             <FiSearch className="text-white/60 ml-5 text-xl" />
//             <input
//               type="text"
//               placeholder="Search for doctors, specializations..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/50 outline-none text-sm"
//             />
//             <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-purple-500/30 flex items-center space-x-2">
//               <span>Search</span>
//               <FiArrowRight />
//             </button>
//           </form>
//         </div>

//         {/* Bottom Wave Shape */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//           <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,139.32,109.31,213.2,90.56C270.23,76.18,348.72,63.21,321.39,56.44Z" fill="#f8fafc"></path>
//           </svg>
//         </div>
//       </section>

//       {/* ================= STATS SECTION ================= */}
//       <section className="py-16 bg-slate-50">
//         <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {[
//             { num: '150+', label: 'Expert Doctors', color: 'from-blue-500 to-blue-600' },
//             { num: '10k+', label: 'Happy Patients', color: 'from-emerald-500 to-cyan-500' },
//             { num: '25+', label: 'Departments', color: 'from-purple-500 to-pink-500' },
//             { num: '99%', label: 'Success Rate', color: 'from-amber-500 to-orange-500' },
//           ].map((stat, i) => (
//             <div key={i} className="text-center group">
//               <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg flex items-center justify-center text-white text-2xl font-black group-hover:scale-110 transition-transform`}>
//                 {stat.num.charAt(0)}
//               </div>
//               <h3 className="text-3xl font-black text-slate-800">{stat.num}</h3>
//               <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= FEATURES SECTION ================= */}
//       <section className="py-24 bg-white relative overflow-hidden">
//         {/* Background Decoration */}
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10"></div>

//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Our Services</span>
//             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Different</span></h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { icon: <FiShield className="text-blue-600 text-3xl" />, title: "Verified Specialists", desc: "Every doctor is rigorously verified with valid medical licenses and degrees.", gradient: "from-blue-500 to-cyan-500" },
//               { icon: <FiHeart className="text-rose-600 text-3xl" />, title: "Personalized Care", desc: "Digital health records that remember your history for tailored treatments.", gradient: "from-rose-500 to-pink-500" },
//               { icon: <FiActivity className="text-emerald-600 text-3xl" />, title: "Real-Time Tracking", desc: "Track your appointment status, queue, and doctor availability live.", gradient: "from-emerald-500 to-teal-500" },
//             ].map((feature, i) => (
//               <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm card-lift group relative overflow-hidden">
//                 {/* Hover Gradient Background */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                
//                 <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
//                 <p className="text-slate-500 leading-relaxed group-hover:text-white/80 transition-colors">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= CTA SECTION ================= */}
//       <section className="py-24 relative overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0 bg-cover bg-center" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2187d80a18f3?q=80&w=2070&auto=format&fit=crop')" }}>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/90"></div>

//         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Take Control of Your Health?</h2>
//           <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join the future of healthcare. Create your free account today and experience medicine like never before.</p>
//           <Link to="/register" className="inline-flex items-center space-x-3 bg-white text-slate-900 px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all animate-pulse-glow">
//             <span>Create Free Account</span>
//             <FiArrowRight />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import API from '../api/axios';
// import {
//   ArrowRight, Shield, Activity, Sparkles, BrainCircuit, Clock, Users, Star,
//   Stethoscope, HeartPulse, FlaskConical, Pill, Ambulance, Video,
//   MapPin, Phone, Mail, ChevronRight, Loader2
// } from 'lucide-react';

// const Landing = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [docsLoading, setDocsLoading] = useState(true);

//   // Fetch Real Doctors on Load
//   useEffect(() => {
//     const fetchRealDoctors = async () => {
//       try {
//         // ✅ FIXED: Added trailing slash
//         const { data } = await API.get('/doctors/');
//         // ONLY show doctors that are approved by admin
//         const approvedDoctors = data.doctors.filter(doc => doc.isApproved === true);
//         setDoctors(approvedDoctors);
//       } catch (error) {
//         console.error("Failed to fetch doctors");
//       } finally {
//         setDocsLoading(false);
//       }
//     };
//     fetchRealDoctors();
//   }, []);

//   return (
//     <div className="relative overflow-hidden bg-slate-950 text-white">

//       {/* ==================== HERO SECTION ==================== */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop')" }} />
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950"></div>
//         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

//         <nav className="absolute top-0 w-full z-20 px-6 py-6">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/30">Z</div>
//               <span className="text-2xl font-black tracking-tight">ZH<span className="text-cyan-400">-Care</span></span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
//               <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
//               <a href="#specialists" className="hover:text-cyan-400 transition-colors">Specialists</a>
//               <a href="#location" className="hover:text-cyan-400 transition-colors">Location</a>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link to="/auth" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Sign In</Link>
//               <Link to="/auth" className="px-5 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-cyan-50 transition-colors shadow-xl">Get Started</Link>
//             </div>
//           </div>
//         </nav>

//         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
//           <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
//             <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-cyan-300 mb-8">
//               <Sparkles size={16} className="text-cyan-400" /> <span>The Future of Healthcare Management</span>
//             </div>
//             <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
//               Experience<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-lg">Next-Gen</span><br />Medicine.
//             </h1>
//             <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">ZH-Care empowers hospitals and clinics with AI-driven scheduling, real-time analytics, and a seamless digital ecosystem.</p>
//             <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/10 shadow-2xl shadow-black/50">
//               <input type="text" placeholder="Search doctors, specializations..." className="flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-500 outline-none text-sm" />
//               <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center space-x-2">
//                 <span>Explore</span><ArrowRight size={16} />
//               </button>
//             </div>
//           </motion.div>
//         </div>
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
//           <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,139.32,109.31,213.2,90.56C270.23,76.18,348.72,63.21,321.39,56.44Z" fill="#020617"></path></svg>
//         </div>
//       </section>

//       {/* ==================== SERVICES SECTION ==================== */}
//       <section id="services" className="py-32 bg-slate-950 relative">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
//             <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">What We Offer</span>
//             <h2 className="text-4xl md:text-6xl font-black mt-4 text-white">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span></h2>
//             <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">Comprehensive medical solutions tailored for the modern world.</p>
//           </motion.div>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { icon: <Stethoscope size={28} />, title: "OPD Consultations", desc: "Expert general and specialist consultations with minimal wait times.", gradient: "from-cyan-500 to-blue-600" },
//               { icon: <FlaskConical size={28} />, title: "Advanced Diagnostics", desc: "State-of-the-art laboratory and radiology imaging services.", gradient: "from-purple-500 to-pink-600" },
//               { icon: <Pill size={28} />, title: "Digital Pharmacy", desc: "Instant prescription fulfillment with home delivery tracking.", gradient: "from-emerald-500 to-teal-600" },
//               { icon: <Ambulance size={28} />, title: "Emergency Care", desc: "24/7 trauma center and rapid response emergency units.", gradient: "from-red-500 to-orange-600" },
//               { icon: <Video size={28} />, title: "Telemedicine", desc: "Consult top doctors securely from the comfort of your home.", gradient: "from-blue-500 to-indigo-600" },
//               { icon: <HeartPulse size={28} />, title: "Mental Wellness", desc: "Confidential therapy sessions and psychiatric support.", gradient: "from-pink-500 to-rose-600" },
//             ].map((service, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group relative bg-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${service.gradient} shadow-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>{service.icon}</div>
//                 <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
//                 <p className="text-slate-400 leading-relaxed text-sm">{service.desc}</p>
//                 <div className="mt-6 flex items-center text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Learn More <ChevronRight size={16} className="ml-1" /></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ==================== SPECIALISTS SECTION (REAL DATA) ==================== */}
//       <section id="specialists" className="py-32 bg-slate-900/50">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
//             <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Our Team</span>
//             <h2 className="text-4xl md:text-6xl font-black mt-4 text-white">Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Specialists</span></h2>
//           </motion.div>

//           {docsLoading ? (
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="animate-spin text-cyan-400" size={40} />
//             </div>
//           ) : doctors.length === 0 ? (
//             <div className="text-center py-20 text-slate-500">
//               <p className="text-xl">No approved specialists available at the moment.</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-4 gap-8">
//               {doctors.slice(0, 4).map((doc, i) => (
//                 <motion.div key={doc._id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} whileHover={{ y: -15 }} className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 shadow-2xl">
//                   <div className="h-72 overflow-hidden bg-slate-800">
//                     <img src={doc.avatar?.url && !doc.avatar.url.includes('default') ? doc.avatar.url : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop"} alt={doc.user?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
//                   </div>
//                   <div className="p-6 -mt-16 relative z-10">
//                     <div className="flex justify-center mb-4">
//                       <div className="flex text-yellow-400 text-sm"> {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
//                     </div>
//                     <h3 className="text-lg font-bold text-white text-center">{doc.user?.name}</h3>
//                     <p className="text-cyan-400 text-sm text-center font-medium mb-2">{doc.specialization}</p>
//                     <p className="text-slate-400 text-xs text-center mb-4">Fee: Rs. {doc.fees}</p>
//                     <Link to={`/doctor/${doc._id}`} className="block w-full py-3 text-center border border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all">View Profile</Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ==================== LOCATION & CONTACT ==================== */}
//       <section id="location" className="py-32 bg-slate-950">
//         <div className="max-w-7xl mx-auto px-6">
//           <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Find Us</span>
//               <h2 className="text-4xl md:text-5xl font-black mt-4 text-white mb-8">Our Location & Contact</h2>
//               <div className="space-y-8">
//                 <div className="flex items-start space-x-5 group">
//                   <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all flex-shrink-0"><MapPin size={24} /></div>
//                   <div>
//                     <h4 className="font-bold text-white text-lg">Main Campus</h4>
//                     <p className="text-slate-400 mt-1">123 Healthcare Blvd, Johar Town, Lahore, Pakistan</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-5 group">
//                   <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all flex-shrink-0"><Phone size={24} /></div>
//                   <div>
//                     <h4 className="font-bold text-white text-lg">Emergency & Appointments</h4>
//                     <p className="text-slate-400 mt-1">+92 300 1234567</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-5 group">
//                   <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all flex-shrink-0"><Mail size={24} /></div>
//                   <div>
//                     <h4 className="font-bold text-white text-lg">Email Us</h4>
//                     <p className="text-slate-400 mt-1">contact@zhcare.com</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="relative h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
//               {/* ✅ FIXED: Changed referrerpolicy to referrerPolicy (Capital P) */}
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.123456789!2d74.345678901!3d31.520000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEyLjAiTiA3NMKwMjAnNDQuNCJF!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
//                 allowFullScreen="" loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="absolute inset-0"
//               ></iframe>
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ==================== FOOTER ==================== */}
//       <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-4 gap-12 mb-16">
//             <div className="md:col-span-1">
//               <div className="flex items-center space-x-2 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">Z</div>
//                 <span className="text-xl font-black">ZH<span className="text-cyan-400">-Care</span></span>
//               </div>
//               <p className="text-slate-400 text-sm leading-relaxed mb-6">Redefining healthcare infrastructure with next-generation digital tools.</p>
//               <div className="flex space-x-3">
//                 <a href="https://facebook.com" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
//                 </a>
//                 <a href="https://wa.me/923001234567" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:border-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30 transition-all">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
//                 </a>
//                 <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:border-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-700/30 transition-all">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold text-white text-lg mb-6">Quick Links</h4>
//               <ul className="space-y-3 text-slate-400 text-sm">
//                 <li><a href="#services" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Our Services</a></li>
//                 <li><a href="#specialists" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Find Doctors</a></li>
//                 <li><Link to="/auth" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Patient Portal</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-white text-lg mb-6">Services</h4>
//               <ul className="space-y-3 text-slate-400 text-sm">
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Cardiology</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Neurology</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Orthopedics</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-white text-lg mb-6">Legal</h4>
//               <ul className="space-y-3 text-slate-400 text-sm">
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
//             <p>© {new Date().getFullYear()} ZH-Care. All rights reserved.</p>
//             <p className="mt-2 md:mt-0">Engineered with 💙 for the future of medicine.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Landing;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { loginUser } = React.useContext(UserContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = await loginUser(formData);
//     setLoading(false);
//     if (result.success) navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         <div className="absolute inset-0 bg-cover bg-center" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1470&auto=format&fit=crop')" }}>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-slate-900/60 to-slate-900/90"></div>
        
//         <div className="relative z-10 flex flex-col justify-center px-16 text-white">
//           <h2 className="text-5xl font-black leading-tight mb-6">
//             Welcome Back to<br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">MedCare</span>
//           </h2>
//           <p className="text-slate-300 text-lg leading-relaxed mb-8">
//             Access your personalized dashboard, manage appointments, and connect with top doctors instantly.
//           </p>
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 text-2xl">🛡️</div>
//             <div>
//               <p className="font-bold text-sm">100% Secure Login</p>
//               <p className="text-slate-400 text-xs">Encrypted & Protected</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-8">
//             <h1 className="text-3xl font-black text-slate-900">Med<span className="text-blue-600">Care</span></h1>
//           </div>

//           <h2 className="text-3xl font-black text-slate-900 mb-2">Sign In</h2>
//           <p className="text-slate-500 mb-8">Enter your credentials to access your account</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//               <div className="relative">
//                 <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//               <div className="relative">
//                 <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-12 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
//                 <span className="text-slate-600">Remember me</span>
//               </label>
//               <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-semibold">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <span>Sign In</span>
//               )}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-slate-500 text-sm">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold">
//               Create Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import API from '../api/axios';
// import AppointmentCard from '../components/appointment/AppointmentCard';
// import Loader from '../components/common/Loader';
// import { Link } from 'react-router-dom';
// import { FiCalendar } from 'react-icons/fi';

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const { data } = await API.get('/appointments/my');
//       setAppointments(data.appointments);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
//             <p className="text-gray-600 mt-1">View all your booked appointments</p>
//           </div>
//           <Link
//             to="/doctors"
//             className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiCalendar />
//             <span>Book New</span>
//           </Link>
//         </div>

//         {/* Appointments List */}
//         {appointments.length > 0 ? (
//           <div className="space-y-4">
//             {appointments.map((appointment) => (
//               <AppointmentCard key={appointment._id} appointment={appointment} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-md">
//             <span className="text-6xl">📅</span>
//             <h3 className="mt-4 text-xl font-semibold text-gray-700">No Appointments Yet</h3>
//             <p className="text-gray-500 mt-2">You haven't booked any appointments yet</p>
//             <Link
//               to="/doctors"
//               className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Browse Doctors
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Home } from 'lucide-react';

// const NotFound = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="text-center"
//       >
//         <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//           404
//         </h1>
//         <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-4">Page Not Found</h2>
//         <p className="text-slate-500 mt-4 max-w-md mx-auto">
//           Sorry, the page you are looking for doesn't exist or has been moved.
//         </p>
//         <Link to="/" className="inline-flex items-center space-x-2 mt-8 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-transform">
//           <Home size={20} /> <span>Back to Home</span>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default NotFound;



// import React, { useState, useEffect } from 'react';
// import API from '../api/axios';
// import { UserContext } from '../context/UserContext';
// import Loader from '../components/common/Loader';
// import { toast } from 'react-toastify';
// import { FiUser, FiEdit2, FiSave, FiX } from 'react-icons/fi';

// const PatientProfile = () => {
//   const { user } = React.useContext(UserContext);
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     age: '',
//     gender: '',
//     bloodGroup: '',
//     contact: '',
//     address: '',
//     disease: '',
//   });

//   useEffect(() => {
//     if (user) fetchPatientProfile();
//   }, [user]);

//   const fetchPatientProfile = async () => {
//     try {
//       const { data } = await API.get('/patients/me');
//       setPatient(data.patient);
//       setFormData({
//         age: data.patient.age || '',
//         gender: data.patient.gender || '',
//         bloodGroup: data.patient.bloodGroup || '',
//         contact: data.patient.contact || '',
//         address: data.patient.address || '',
//         disease: data.patient.disease || '',
//       });
//     } catch (error) {
//       console.log('No patient profile yet');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/patients/create', formData);
//       toast.success('Patient profile created!');
//       fetchPatientProfile();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create profile');
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put('/patients/update', formData);
//       toast.success('Profile updated!');
//       setEditing(false);
//       fetchPatientProfile();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete your patient profile?')) {
//       try {
//         await API.delete('/patients/delete');
//         toast.success('Profile deleted!');
//         setPatient(null);
//         setFormData({
//           age: '',
//           gender: '',
//           bloodGroup: '',
//           contact: '',
//           address: '',
//           disease: '',
//         });
//       } catch (error) {
//         toast.error('Failed to delete profile');
//       }
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-2xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Profile</h1>

//         {!patient ? (
//           /* Create Profile Form */
//           <form onSubmit={handleCreate} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800">Create Your Patient Profile</h2>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                   min="0"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
//                 <select
//                   name="bloodGroup"
//                   value={formData.bloodGroup}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option value="">Select Blood Group</option>
//                   {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
//                     <option key={bg} value={bg}>{bg}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Phone number"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Your address"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Disease/Condition</label>
//               <input
//                 type="text"
//                 name="disease"
//                 value={formData.disease}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Current disease or condition"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Create Profile
//             </button>
//           </form>
//         ) : (
//           /* View/Edit Profile */
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//             {/* Header */}
//             <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
//               <div className="flex items-center space-x-3">
//                 <FiUser className="text-2xl" />
//                 <h2 className="text-xl font-semibold">{patient.user?.name}</h2>
//               </div>
//               {!editing ? (
//                 <button
//                   onClick={() => setEditing(true)}
//                   className="flex items-center space-x-1 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
//                 >
//                   <FiEdit2 />
//                   <span>Edit</span>
//                 </button>
//               ) : (
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditing(false);
//                       fetchPatientProfile();
//                     }}
//                     className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
//                   >
//                     <FiX />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Body */}
//             <div className="p-6">
//               {editing ? (
//                 <form onSubmit={handleUpdate} className="space-y-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleChange}
//                         min="0"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                       >
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
//                       <select
//                         name="bloodGroup"
//                         value={formData.bloodGroup}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                       >
//                         <option value="">Select</option>
//                         {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
//                           <option key={bg} value={bg}>{bg}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
//                       <input
//                         type="text"
//                         name="contact"
//                         value={formData.contact}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                     <input
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
//                     <input
//                       type="text"
//                       name="disease"
//                       value={formData.disease}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <FiSave />
//                     <span>Save Changes</span>
//                   </button>
//                 </form>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <p className="text-sm text-gray-500">Age</p>
//                     <p className="font-medium">{patient.age} years</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Gender</p>
//                     <p className="font-medium capitalize">{patient.gender}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Blood Group</p>
//                     <p className="font-medium">{patient.bloodGroup || 'Not specified'}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Contact</p>
//                     <p className="font-medium">{patient.contact}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <p className="text-sm text-gray-500">Address</p>
//                     <p className="font-medium">{patient.address || 'Not specified'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <p className="text-sm text-gray-500">Current Disease/Condition</p>
//                     <p className="font-medium">{patient.disease}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Delete Button */}
//               {!editing && (
//                 <div className="mt-8 pt-6 border-t">
//                   <button
//                     onClick={handleDelete}
//                     className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
//                   >
//                     Delete Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { registerUser } = React.useContext(UserContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//    throw new Error("Intentional Test Error!"); // ADD THIS LINE HERE
//     e.preventDefault();
//     if (formData.password.length < 8) { alert('Password must be at least 8 characters'); return; }
//     setLoading(true);
//     const result = await registerUser(formData);
//     setLoading(false);
//     if (result.success) navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8 order-2 lg:order-1">
//         <div className="w-full max-w-md">
//           <div className="lg:hidden text-center mb-8">
//             <h1 className="text-3xl font-black text-slate-900">Med<span className="text-blue-600">Care</span></h1>
//           </div>

//           <h2 className="text-3xl font-black text-slate-900 mb-2">Get Started</h2>
//           <p className="text-slate-500 mb-8">Create your account in seconds</p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
//               <div className="relative">
//                 <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   minLength={3}
//                   className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//               <div className="relative">
//                 <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//               <div className="relative">
//                 <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength={8}
//                   className="w-full pl-12 pr-12 py-4 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
//                   placeholder="Min 8 characters"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <p className="mt-8 text-center text-slate-500 text-sm">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Image */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden order-1 lg:order-2">
//         <div className="absolute inset-0 bg-cover bg-center" 
//              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop')" }}>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-slate-900/60 to-slate-900/90"></div>
        
//         <div className="relative z-10 flex flex-col justify-center px-16 text-white">
//           <h2 className="text-5xl font-black leading-tight mb-6">
//             Join the<br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Future of Health</span>
//           </h2>
//           <p className="text-slate-300 text-lg leading-relaxed mb-8">
//             Create an account to book appointments, track your health history, and connect with specialists.
//           </p>
//           <div className="space-y-4">
//             {['Instant Appointment Booking', 'Secure Medical Records', '24/7 Customer Support'].map((item, i) => (
//               <div key={i} className="flex items-center space-x-3">
//                 <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-xs">✓</div>
//                 <span className="text-slate-200 font-medium">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { FiLock } from 'react-icons/fi';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const { resetPassword } = React.useContext(UserContext);
//   const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     const result = await resetPassword(token, formData);
//     setLoading(false);
//     if (result.success) {
//       setSuccess(true);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full">
//         {success ? (
//           <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//             <span className="text-5xl">✅</span>
//             <h3 className="mt-4 text-xl font-semibold text-gray-800">Password Reset Successful!</h3>
//             <p className="mt-2 text-gray-600">You can now login with your new password.</p>
//             <Link
//               to="/login"
//               className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Go to Login
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="text-center mb-8">
//               <FiLock className="mx-auto text-4xl text-blue-600" />
//               <h2 className="mt-4 text-3xl font-bold text-gray-800">Reset Password</h2>
//               <p className="mt-2 text-gray-600">Enter your new password</p>
//             </div>

//             <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   minLength={8}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Min 8 characters"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   minLength={8}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Confirm password"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//               >
//                 {loading ? 'Resetting...' : 'Reset Password'}
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import { FiUser, FiCalendar, FiFileText, FiLock, FiArrowRight } from 'react-icons/fi';

// const UserDashboard = () => {
//   const { user } = React.useContext(UserContext);

//   if (!user) return null;

//   const cards = [
//     {
//       title: 'My Profile',
//       description: 'View and update your patient profile',
//       icon: <FiUser className="text-2xl" />,
//       link: '/patient-profile',
//       color: 'bg-blue-500',
//     },
//     {
//       title: 'My Appointments',
//       description: 'View all your appointments',
//       icon: <FiCalendar className="text-2xl" />,
//       link: '/my-appointments',
//       color: 'bg-green-500',
//     },
//     {
//       title: 'Book Appointment',
//       description: 'Book a new appointment with a doctor',
//       icon: <FiFileText className="text-2xl" />,
//       link: '/doctors',
//       color: 'bg-purple-500',
//     },
//     {
//       title: 'Change Password',
//       description: 'Update your account password',
//       icon: <FiLock className="text-2xl" />,
//       link: '/change-password',
//       color: 'bg-orange-500',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Welcome Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white mb-8">
//           <h1 className="text-3xl font-bold">Welcome, {user.name}! 👋</h1>
//           <p className="text-blue-100 mt-2">
//             Manage your healthcare from your personal dashboard
//           </p>
//           <div className="mt-4 flex items-center space-x-4">
//             <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
//               {user.role}
//             </span>
//             <span className="text-blue-100 text-sm">{user.email}</span>
//           </div>
//         </div>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cards.map((card) => (
//             <Link
//               key={card.title}
//               to={card.link}
//               className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
//             >
//               <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
//                 {card.icon}
//               </div>
//               <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
//               <p className="text-sm text-gray-500 mb-4">{card.description}</p>
//               <span className="text-blue-600 text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all">
//                 <span>Go</span>
//                 <FiArrowRight />
//               </span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




// // App.css file code 

// @import "tailwindcss";
// @plugin "daisyui";




// // import React from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AppProvider, AppContext } from './context/AppContext';
// // import Landing from './pages/Landing';
// // import Auth from './pages/Auth';
// // import DashboardLayout from './components/layout/DashboardLayout';
// // import AdminDashboard from './pages/dashboards/AdminDashboard';
// // import DoctorsList from './pages/DoctorsList';
// // import PatientDashboard from './pages/dashboards/PatientDashboard';
// // import AdminManageUsers from './pages/dashboards/AdminManageUsers';
// // import NotFound from './pages/NotFound';
// // import Chatbot from './components/Chatbot';
// // import EmergencyBtn from './components/EmergencyBtn';
// // import Loader from './components/common/Loader'; // Make sure this exists, or remove it if it throws an error

// // // ⬇️ THIS COMPONENT PROTECTS ADMIN ROUTES ⬇️
// // const AdminRoute = ({ children }) => {
// //   const { user, isAppLoading } = React.useContext(AppContext);
  
// //   if (isAppLoading) return <Loader />;
// //   if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />; // Kick non-admins back to main dashboard
  
// //   return children;
// // };


// // // ⬇️ REPLACE THE OLD DashboardIndex WITH THIS ⬇️
// // const DashboardIndex = () => {
// //   const { user, isAppLoading } = React.useContext(AppContext);
  
// //   if (isAppLoading) return <Loader />;
  
// //   // FIX: Admin sees Admin Dashboard. Normal user sees Patient Portal directly (NO redirect loop!)
// //   if (user?.role === 'admin') return <AdminDashboard />;
  
// //   return <PatientDashboard />;
// // };

// // const App = () => (
// //   <AppProvider>
// //     <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
// //       <Toaster position="top-right" />
      
// //       {/* These floating buttons only show on the public landing page */}
// //       <EmergencyBtn />
// //       <Chatbot />

// //       <Routes>
// //         {/* PUBLIC ROUTES */}
// //         <Route path="/" element={<Landing />} />
// //         <Route path="/auth" element={<Auth />} />
        
// //         {/* DASHBOARD ROUTES (Uses Layout with Sidebar) */}
// //         <Route path="/dashboard" element={<DashboardLayout />}>
// //           {/* The default route changes based on who is logged in */}
// //           <Route index element={<DashboardIndex />} />
          
// //           {/* NORMAL USER ROUTES (Accessible to everyone) */}
// //           <Route path="patients" element={<PatientDashboard />} />
          
// //           {/* ADMIN ONLY ROUTES (Wrapped in AdminRoute protection) */}
// //           <Route path="doctors" element={<AdminRoute><DoctorsList /></AdminRoute>} />
// //           <Route path="manage-users" element={<AdminRoute><AdminManageUsers /></AdminRoute>} />
// //         </Route>

// //         {/* 404 PAGE */}
// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </div>
// //   </AppProvider>
// // );

// // export default App;


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AppContext } from './context/AppContext';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import { AppProvider } from './context/AppContext';

// // Page Imports
// import Landing from './pages/Landing';
// import Auth from './pages/Auth';
// import DashboardLayout from './components/layout/DashboardLayout';
// import AdminDashboard from './pages/dashboards/AdminDashboard';
// import DoctorsList from './pages/DoctorsList';
// import PatientDashboard from './pages/dashboards/PatientDashboard';
// import AdminManageUsers from './pages/dashboards/AdminManageUsers';
// import NotFound from './pages/NotFound';
// import DoctorProfile from './pages/DoctorProfile';

// const App = () => (
//   <ErrorBoundary>
//     <AppProvider>
//       <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
//         <Toaster position="top-right" />
        
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/auth" element={<Auth />} />
          
//           <Route path="/dashboard" element={<DashboardLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="patients" element={<PatientDashboard />} />
//             <Route path="doctors" element={<AdminDashboard />} />
//             <Route path="manage-users" element={<AdminManageUsers />} />
//             {/* <Route path="doctor/:id" element={<DoctorProfile />}/> */}
//             <Route path='doctor/:id' element={<DoctorProfile/>}/>
//             <Route path="doctors-profile" element={<DoctorProfile/>}/>
//           </Route>

//           {/* <Route path="/patient-dashboard" element={<PatientDashboard/>}>
//           </Route> */}

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </AppProvider>
//   </ErrorBoundary>
// );

// export default App;





// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

// * { font-family: 'Inter', sans-serif; }
// body { overflow-x: hidden; }
// html { scroll-behavior: smooth; }

// /* Custom Scrollbar */
// ::-webkit-scrollbar { width: 6px; }
// ::-webkit-scrollbar-track { background: transparent; }
// ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
// .dark ::-webkit-scrollbar-thumb { background: #475569; }

// /* Glass Utility */
// .glass {
//   background: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(20px);
//   border: 1px solid rgba(255, 255, 255, 0.3);
// }
// .dark .glass {
//   background: rgba(30, 41, 59, 0.7);
//   border: 1px solid rgba(255, 255, 255, 0.1);
// }




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { AppContext } from './context/AppContext';
// import './index.css';
// import { AppProvider } from './context/AppContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
//       <AppProvider>
//         <App />
//       </AppProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { AppContext } from './context/AppContext';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
//       <AppProvider>
//         <App />
//       </AppProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );




// <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>frontend</title>
//     <link href="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.css" rel="stylesheet" />

//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.jsx"></script>
//     <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js"></script>

//   </body>
// </html>







// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   darkMode: 'class', // Enable class-based dark mode
//   theme: {
//     extend: {
//       colors: {
//         glass: 'rgba(255, 255, 255, 0.1)',
//         'glass-dark': 'rgba(15, 23, 42, 0.6)',
//       },
//       boxShadow: {
//         'neu-flat': '6px 6px 12px #d1d5db, -6px -6px 12px #ffffff',
//         'neu-pressed': 'inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff',
//         'neu-dark': '6px 6px 12px #1e293b, -6px -6px 12px #334155',
//         'neu-dark-pressed': 'inset 4px 4px 8px #1e293b, inset -4px -4px 8px #334155',
//       }
//     },
//   },
//   plugins: [],
// }

