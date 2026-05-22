import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import {
  ArrowRight, Shield, Activity, Sparkles, BrainCircuit, Clock, Users, Star,
  Stethoscope, HeartPulse, FlaskConical, Pill, Ambulance, Video,
  MapPin, Phone, Mail, ChevronRight, Loader2
} from 'lucide-react';

const Landing = () => {
  const [doctors, setDoctors] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);

  // Fetch Real Doctors on Load
  useEffect(() => {
    const fetchRealDoctors = async () => {
      try {
        // ✅ FIXED: Added trailing slash
        const { data } = await API.get('/doctors/');
        // ONLY show doctors that are approved by admin
        const approvedDoctors = data.doctors.filter(doc => doc.isApproved === true);
        setDoctors(approvedDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors");
      } finally {
        setDocsLoading(false);
      }
    };
    fetchRealDoctors();
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2070&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <nav className="absolute top-0 w-full z-20 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/30">Z</div>
              <span className="text-2xl font-black tracking-tight">ZH<span className="text-cyan-400">-Care</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
              <a href="#specialists" className="hover:text-cyan-400 transition-colors">Specialists</a>
              <a href="#location" className="hover:text-cyan-400 transition-colors">Location</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/auth" className="px-5 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-cyan-50 transition-colors shadow-xl">Get Started</Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-cyan-300 mb-8">
              <Sparkles size={16} className="text-cyan-400" /> <span>The Future of Healthcare Management</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
              Experience<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-lg">Next-Gen</span><br />Medicine.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">ZH-Care empowers hospitals and clinics with AI-driven scheduling, real-time analytics, and a seamless digital ecosystem.</p>
            <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-2 flex items-center border border-white/10 shadow-2xl shadow-black/50">
              <input type="text" placeholder="Search doctors, specializations..." className="flex-1 px-6 py-4 bg-transparent text-white placeholder-slate-500 outline-none text-sm" />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center space-x-2">
                <span>Explore</span><ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,139.32,109.31,213.2,90.56C270.23,76.18,348.72,63.21,321.39,56.44Z" fill="#020617"></path></svg>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section id="services" className="py-32 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 text-white">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span></h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">Comprehensive medical solutions tailored for the modern world.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Stethoscope size={28} />, title: "OPD Consultations", desc: "Expert general and specialist consultations with minimal wait times.", gradient: "from-cyan-500 to-blue-600" },
              { icon: <FlaskConical size={28} />, title: "Advanced Diagnostics", desc: "State-of-the-art laboratory and radiology imaging services.", gradient: "from-purple-500 to-pink-600" },
              { icon: <Pill size={28} />, title: "Digital Pharmacy", desc: "Instant prescription fulfillment with home delivery tracking.", gradient: "from-emerald-500 to-teal-600" },
              { icon: <Ambulance size={28} />, title: "Emergency Care", desc: "24/7 trauma center and rapid response emergency units.", gradient: "from-red-500 to-orange-600" },
              { icon: <Video size={28} />, title: "Telemedicine", desc: "Consult top doctors securely from the comfort of your home.", gradient: "from-blue-500 to-indigo-600" },
              { icon: <HeartPulse size={28} />, title: "Mental Wellness", desc: "Confidential therapy sessions and psychiatric support.", gradient: "from-pink-500 to-rose-600" },
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group relative bg-slate-900/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${service.gradient} shadow-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{service.desc}</p>
                <div className="mt-6 flex items-center text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Learn More <ChevronRight size={16} className="ml-1" /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SPECIALISTS SECTION (REAL DATA) ==================== */}
      <section id="specialists" className="py-32 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Our Team</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 text-white">Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Specialists</span></h2>
          </motion.div>

          {docsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-cyan-400" size={40} />
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-xl">No approved specialists available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              {doctors.slice(0, 4).map((doc, i) => (
                <motion.div key={doc._id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} whileHover={{ y: -15 }} className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 shadow-2xl">
                  <div className="h-72 overflow-hidden bg-slate-800">
                    <img src={doc.avatar?.url && !doc.avatar.url.includes('default') ? doc.avatar.url : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop"} alt={doc.user?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 -mt-16 relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="flex text-yellow-400 text-sm"> {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                    </div>
                    <h3 className="text-lg font-bold text-white text-center">{doc.user?.name}</h3>
                    <p className="text-cyan-400 text-sm text-center font-medium mb-2">{doc.specialization}</p>
                    <p className="text-slate-400 text-xs text-center mb-4">Fee: Rs. {doc.fees}</p>
                    <Link to="/auth" className="block w-full py-3 text-center border border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:bg-cyan-500 hover:border-cyan-500 hover:text-white transition-all">View Profile</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== LOCATION & CONTACT ==================== */}
      <section id="location" className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Find Us</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 text-white mb-8">Our Location & Contact</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all flex-shrink-0"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Main Campus</h4>
                    <p className="text-slate-400 mt-1">123 Healthcare Blvd, Johar Town, Lahore, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all flex-shrink-0"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Emergency & Appointments</h4>
                    <p className="text-slate-400 mt-1">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all flex-shrink-0"><Mail size={24} /></div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Email Us</h4>
                    <p className="text-slate-400 mt-1">contact@zhcare.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              {/* ✅ FIXED: Changed referrerpolicy to referrerPolicy (Capital P) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.123456789!2d74.345678901!3d31.520000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEyLjAiTiA3NMKwMjAnNDQuNCJF!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">Z</div>
                <span className="text-xl font-black">ZH<span className="text-cyan-400">-Care</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Redefining healthcare infrastructure with next-generation digital tools.</p>
              <div className="flex space-x-3">
                <a href="https://facebook.com" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://wa.me/923001234567" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:border-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:border-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-700/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#services" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Our Services</a></li>
                <li><a href="#specialists" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Find Doctors</a></li>
                <li><Link to="/auth" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Patient Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Cardiology</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Neurology</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Orthopedics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Legal</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center"><ChevronRight size={14} className="mr-2 text-slate-600" />Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} ZH-Care. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Engineered with ZH for the future of medicine.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;