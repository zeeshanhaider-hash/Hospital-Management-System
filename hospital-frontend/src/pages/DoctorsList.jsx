import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Search, CheckCircle, XCircle, X, Loader2 } from 'lucide-react';

const DoctorsList = () => {
  const { darkMode } = React.useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [setupData, setSetupData] = useState({
    specialization: '',
    contact: '',
    fees: '',
    timing: '',
    days: []
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/doctors/');
      setDoctors(data.doctors);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  // Open Modal & Pre-fill Data
  const openSetupModal = (doc) => {
    setSelectedDoc(doc);
    setSetupData({
      specialization: doc.specialization || '',
      contact: doc.contact || '',
      fees: doc.fees || '',
      timing: doc.timing || '',
      days: doc.days || []
    });
    setShowModal(true);
  };

  // Save Info AND Approve in one single request
  const handleSetupAndApprove = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // We send setupData AND isApproved: true at the same time!
      await API.put(`/doctors/${selectedDoc._id}/`, {
        ...setupData,
        fees: Number(setupData.fees), // Ensure fees is a number
        isApproved: true
      });

      toast.success("Doctor details saved & approved successfully!");
      setShowModal(false);
      fetchDoctors(); // Refresh list to show updated data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Reject (Delete from DB)
  const handleReject = async (docId) => {
    const confirmDelete = window.confirm("Are you sure you want to reject and delete this doctor?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/doctors/${docId}/`);
      toast.success("Doctor rejected and removed.");
      setDoctors(doctors.filter(doc => doc._id !== docId));
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  const handleDayToggle = (day) => {
    setSetupData(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };

  if (loading) return <div className="text-center py-20 text-slate-500">Loading doctors...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Doctors</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input type="text" placeholder="Search doctors..." className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`p-6 rounded-3xl border text-center group cursor-pointer transition-all ${
              doc.isApproved 
                ? `${darkMode ? 'bg-slate-900 border-slate-800 shadow-neu-dark' : 'bg-white border-slate-100 shadow-neu-flat'}` 
                : `${darkMode ? 'bg-red-950/30 border-red-800/50' : 'bg-red-50 border-red-200'}`
            }`}
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👨‍⚕️</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{doc.user?.name}</h3>
            <p className={`font-medium mt-1 ${doc.specialization !== 'Not Assigned' ? 'text-cyan-600' : 'text-slate-400 italic'}`}>
              {doc.specialization}
            </p>
            
            <div className="flex items-center justify-center space-x-1 mt-3 text-slate-500 text-sm">
              <span>Rs. {doc.fees}</span>
              <span>•</span>
              <span>{doc.timing}</span>
            </div>

            <div className="mt-5 mb-5 flex justify-center">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                doc.isApproved 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 animate-pulse'
              }`}>
                {doc.isApproved ? '✓ VERIFIED' : '⏳ PENDING SETUP'}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex space-x-2">
              {doc.isApproved ? (
                <button onClick={() => handleReject(doc._id)} className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-all">
                  <XCircle size={16} /><span>Reject</span>
                </button>
              ) : (
                <button onClick={() => openSetupModal(doc)} className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">
                  <CheckCircle size={16} /><span>Setup & Approve</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==================== SETUP & APPROVE MODAL ==================== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Setup Doctor</h2>
                  <p className="text-sm text-slate-500 mt-1">Approving: {selectedDoc?.user?.name}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
              </div>

              <form onSubmit={handleSetupAndApprove} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Specialization *</label>
                  <input type="text" name="specialization" required value={setupData.specialization} onChange={(e) => setSetupData({...setupData, specialization: e.target.value})} placeholder="e.g., Cardiologist" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact *</label>
                    <input type="text" name="contact" required value={setupData.contact} onChange={(e) => setSetupData({...setupData, contact: e.target.value})} placeholder="03XX-XXXXXXX" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Fees (Rs) *</label>
                    <input type="number" name="fees" required value={setupData.fees} onChange={(e) => setSetupData({...setupData, fees: e.target.value})} placeholder="1500" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Timing *</label>
                  <input type="text" name="timing" required value={setupData.timing} onChange={(e) => setSetupData({...setupData, timing: e.target.value})} placeholder="e.g., 9:00 AM - 5:00 PM" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Available Days *</label>
                  <div className="flex flex-wrap gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          setupData.days.includes(day)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:border-blue-300'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30 disabled:opacity-50 transition-colors"
                >
                  {saving ? <Loader2 size={20} className="animate-spin" /> : <><CheckCircle size={20} /><span>Save Details & Approve Doctor</span></>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorsList;


