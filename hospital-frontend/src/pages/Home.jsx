import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiShield, FiHeart, FiActivity } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${searchQuery}`);
  };

  return (
    <div className="overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop')" }}>
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>

        {/* Floating Decorative Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium text-blue-200 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Trusted by 10,000+ Patients Nationwide
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Next-Gen<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
              Healthcare
            </span> Solutions
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience seamless doctor consultations, digital records, and instant appointments—all wrapped in a beautiful, modern interface.
          </p>

          {/* Premium Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/20 shadow-2xl">
            <FiSearch className="text-white/60 ml-5 text-xl" />
            <input
              type="text"
              placeholder="Search for doctors, specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-4 bg-transparent text-white placeholder-white/50 outline-none text-sm"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-purple-500/30 flex items-center space-x-2">
              <span>Search</span>
              <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Bottom Wave Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,139.32,109.31,213.2,90.56C270.23,76.18,348.72,63.21,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '150+', label: 'Expert Doctors', color: 'from-blue-500 to-blue-600' },
            { num: '10k+', label: 'Happy Patients', color: 'from-emerald-500 to-cyan-500' },
            { num: '25+', label: 'Departments', color: 'from-purple-500 to-pink-500' },
            { num: '99%', label: 'Success Rate', color: 'from-amber-500 to-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg flex items-center justify-center text-white text-2xl font-black group-hover:scale-110 transition-transform`}>
                {stat.num.charAt(0)}
              </div>
              <h3 className="text-3xl font-black text-slate-800">{stat.num}</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Different</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FiShield className="text-blue-600 text-3xl" />, title: "Verified Specialists", desc: "Every doctor is rigorously verified with valid medical licenses and degrees.", gradient: "from-blue-500 to-cyan-500" },
              { icon: <FiHeart className="text-rose-600 text-3xl" />, title: "Personalized Care", desc: "Digital health records that remember your history for tailored treatments.", gradient: "from-rose-500 to-pink-500" },
              { icon: <FiActivity className="text-emerald-600 text-3xl" />, title: "Real-Time Tracking", desc: "Track your appointment status, queue, and doctor availability live.", gradient: "from-emerald-500 to-teal-500" },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm card-lift group relative overflow-hidden">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed group-hover:text-white/80 transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2187d80a18f3?q=80&w=2070&auto=format&fit=crop')" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/90"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join the future of healthcare. Create your free account today and experience medicine like never before.</p>
          <Link to="/register" className="inline-flex items-center space-x-3 bg-white text-slate-900 px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all animate-pulse-glow">
            <span>Create Free Account</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;