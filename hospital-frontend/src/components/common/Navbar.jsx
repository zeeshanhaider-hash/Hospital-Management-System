import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logoutUser } = React.useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl shadow-black/20 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-110">
              M
            </div>
            <span className={`text-2xl font-black tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
              Med<span className="text-blue-400">Care</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'Doctors', 'Dashboard'].map((item) => (
              <Link
                key={item}
                to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  scrolled ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link to="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-purple-300 bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-all">
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-white/10 rounded-full py-1.5 pl-1.5 pr-4 border border-white/20 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white max-w-[100px] truncate">{user.name}</span>
                <button onClick={handleLogout} className="text-white/60 hover:text-red-400 transition-colors">
                  <FiLogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-semibold transition-colors ${scrolled ? 'text-white hover:text-blue-300' : 'text-white/80 hover:text-white'}`}>
                  Sign In
                </Link>
                <Link to="/register" className="px-6 py-2.5 text-sm font-bold text-slate-900 bg-white rounded-full hover:bg-blue-50 shadow-lg shadow-white/20 transition-all hover:scale-105">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white rounded-xl hover:bg-white/10">Home</Link>
            <Link to="/doctors" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-white rounded-xl hover:bg-white/10">Doctors</Link>
            {user ? (
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 rounded-xl hover:bg-white/10 mt-2">Logout</button>
            ) : (
              <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center mt-4 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl">Get Started</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;