import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { 
  UserPlus, Stethoscope, Heart, ShieldCheck, X, Loader2,
  LayoutDashboard, Users
} from 'lucide-react';

const AdminDashboard = () => {
  const { darkMode, stats, user } = React.useContext(AppContext);
  
  const [activeTab, setActiveTab] = useState('overview'); 
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // ✅ CRITICAL: 'contact' must be initialized here, otherwise it won't send to backend
    const [formData, setFormData] = useState({
    // Common Fields
    name: '', email: '', password: '', 
    
    // Doctor Fields (Keep these)
    specialization: '', contact: '', fees: '', timing: '9AM - 5PM', days: ['Monday', 'Tuesday'],
    
    // Patient Fields (Keep these in state to avoid errors, but we won't show inputs)
    age: '', gender: 'male', disease: '' 
  });

  useEffect(() => {
    if (activeTab === 'roles') {
      const fetchUsers = async () => {
        const { data } = await API.get('/users/users');
        setAllUsers(data.users);
      };
      fetchUsers();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // ✅ VALIDATION: Check if contact is missing
    if (activeTab === 'patients' && !formData.contact) {
      toast.error("Phone number is required!");
      setLoading(false);
      return;
    }

    let endpoint = '';
    if (activeTab === 'doctors') {
      endpoint = '/users/admin/create-doctor';
    } else if (activeTab === 'patients') {
      endpoint = '/users/admin/create-patient';
    }
    
    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : 0
    };

    try {
      const result = await API.post(endpoint, payload);
      toast.success(`${activeTab === 'doctors' ? 'Doctor' : 'Patient'} created successfully!`);
      setShowModal(false);
      
      // ✅ COMPLETE RESET (Prevents 'null' errors)
      setFormData({ 
        name: '', 
        email: '', 
        password: '', 
        specialization: '', 
        contact: '', // ✅ Reset contact
        fees: '', 
        timing: '9AM - 5PM', 
        days: ['Monday', 'Tuesday'], 
        age: '', 
        gender: 'male', 
        disease: '' 
      });
      
      // Refresh stats
      // You might need to pass a refresh prop or implement getAllUsers here if it's not in context
    } catch (error) {
      console.error("Backend Error Details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create user");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
            { id: 'doctors', label: 'Add Doctors', icon: <Stethoscope size={16} /> },
            { id: 'patients', label: 'Add Patients', icon: <Heart size={16} /> },
            { id: 'roles', label: 'Manage Roles', icon: <ShieldCheck size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white dark:bg-slate-900 shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-2xl border-l-4 border-blue-500 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <p className="text-sm text-slate-500">Total Users</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.totalUsers}</h3>
            </div>
            <div className={`p-6 rounded-2xl border-l-4 border-green-500 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <p className="text-sm text-slate-500">Active Doctors</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.doctorsCount}</h3>
            </div>
            <div className={`p-6 rounded-2xl border-l-4 border-pink-500 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <p className="text-sm text-slate-500">Patients</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.patientsCount}</h3>
            </div>
            <div className={`p-6 rounded-2xl border-l-4 border-yellow-500 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <p className="text-sm text-slate-500">Revenue</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">${stats.revenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Create Doctors/Patients View */}
      {(activeTab === 'doctors' || activeTab === 'patients') && (
        <div className={`p-8 rounded-3xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <UserPlus className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Create a new {activeTab === 'doctors' ? 'Doctor' : 'Patient'}</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">This will create a new login account and link their medical profile automatically.</p>
          <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
            Create {activeTab === 'doctors' ? 'Doctor' : 'Patient'}
          </button>
        </div>
      )}

      {/* Manage Roles View */}
      {activeTab === 'roles' && (
        <div className="text-center py-10 text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            Manage Roles Section
        </div>
      )}
      
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">Create {activeTab === 'doctors' ? 'Doctor' : 'Patient'}</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X /></button>
              </div>
              
                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                {/* COMMON FIELDS: Name, Email, Password */}
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  onChange={handleChange} 
                  value={formData.name} 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                />
                
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  required 
                  onChange={handleChange} 
                  value={formData.email} 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                />
                
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Temporary Password" 
                  required 
                  minLength={8} 
                  onChange={handleChange} 
                  value={formData.password} 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                />

                {/* ==============================
                     CONDITIONAL FIELDS
                     Show Doctor Details OR Patient Details?
                     You asked for Admin to ONLY input Name/Email/Pass for Patients.
                     So we HIDE Patient Details.
                ============================== */}

                {activeTab === 'doctors' && (
                  <>
                    <input type="text" name="specialization" placeholder="Specialization (e.g., Cardiologist)" required onChange={handleChange} value={formData.specialization} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="contact" placeholder="Contact Number" required onChange={handleChange} value={formData.contact} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                      <input type="number" name="fees" placeholder="Fee (Rs)" required onChange={handleChange} value={formData.fees} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <input type="text" name="timing" placeholder="Timing (e.g., 9AM - 5PM)" required onChange={handleChange} value={formData.timing} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
                  </>
                )}

                {/* ⚠️ WE REMOVED PATIENT FIELDS (Age, Gender, Disease) FROM HERE ⚠️ */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 disabled:opacity-70 transition-colors"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : `Create ${activeTab === 'doctors' ? 'Doctor' : 'Patient'}`}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;