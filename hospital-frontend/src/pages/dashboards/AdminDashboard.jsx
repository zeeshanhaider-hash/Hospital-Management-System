import React, { useState, useEffect, useContext } from 'react';
import API from '../../api/axios';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Users, Stethoscope, Calendar, FileText,
  Plus, Loader2, TrendingUp, Search, Edit2, Trash2, Check, Activity,
  X,        // ✅ FIX 1: Added 'X' to imports
  XCircle   // ✅ FIX 2: Added 'XCircle' for appointments
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧩 REUSABLE UI COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const StatCard = ({ title, value, trend, icon, color }) => {
  const { darkMode } = useContext(AppContext);
  const gradients = {
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600",
    emerald: "from-emerald-500 to-teal-600",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-3xl border relative overflow-hidden shadow-sm ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[color] || gradients.blue
          } opacity-10 rounded-full blur-2xl -mr-10 -mt-10`}
      />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{value}</h2>
          <div className="flex items-center mt-2 gap-1 text-xs font-bold text-emerald-600">
            <TrendingUp size={12} /> {trend}
          </div>
        </div>
        <div
          className={`p-3 rounded-2xl bg-gradient-to-br ${gradients[color] || gradients.blue
            } text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ message, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
      <Icon size={32} className="text-slate-400 dark:text-slate-500" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{message}</h3>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Inactive: "bg-slate-100 text-slate-700 border-slate-200",
  };
  const style = styles[status] || styles.Pending;
  return <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style}`}>{status}</span>;
};

const DataTable = ({ title, columns, data, loading, renderRow }) => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={`rounded-3xl border overflow-hidden shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className={`bg-slate-50 dark:bg-slate-800 text-xs uppercase font-semibold text-slate-500`}>
            <tr>{columns.map((col, i) => <th key={i} className="px-6 py-4">{col}</th>)}</tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
            {loading ? (
              <tr><td colSpan={columns.length} className="text-center py-8"><Loader2 className="animate-spin mx-auto text-blue-500" /></td></tr>
            ) : data.length > 0 ? (
              data.map(renderRow)
            ) : (
              <tr><td colSpan={columns.length}><EmptyState message="No records found" icon={Search} /></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏥 MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const AdminDashboard = () => {
  const { darkMode } = useContext(AppContext);

  // ━━━━ STATE ━━━━
  const [activeTab, setActiveTab] = useState("overview");
  const [lists, setLists] = useState({ users: [], doctors: [], patients: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("doctor");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // ━━━━ DATA FETCHING ━━━━
  // Inside AdminDashboard.jsx

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, docsRes] = await Promise.all([
        API.get("/users/users"),
        API.get("/doctors")
      ]);

      const allUsers = usersRes.data.users || [];
      const docs = docsRes.data.doctors || [];

      setLists(prev => ({
        ...prev,
        users: allUsers,
        doctors: docs,
        patients: allUsers.filter(u => u.role === 'user'),
      }));

    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []); // ✅ Run ONCE on mount — no activeTab dependency here

// ✅ Separate effect ONLY for appointments
useEffect(() => {
  if (activeTab === 'appointments') {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const aptRes = await API.get('/appointments/admin/all');
        setLists(prev => ({ 
          ...prev, 
          appointments: aptRes.data.appointments || [] 
        }));
      } catch (error) {
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }
}, [activeTab]); // ✅ Only re-runs when tab changes
  // ━━━━ HANDLERS ━━━━

  // 1. Add Doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const selectedDays = Array.from(e.target.querySelectorAll('input[name="days"]:checked')).map(cb => cb.value);
    data.days = selectedDays;
    data.fees = Number(data.fees);

    const tempId = 'temp-' + Date.now();
    const newDoc = { _id: tempId, user: { name: data.name }, specialization: data.specialization, isApproved: false };
    setLists(prev => ({ ...prev, doctors: [...prev.doctors, newDoc] }));

    try {
      await API.post('/users/admin/create-doctor', data);
      toast.success("Doctor created successfully");
      setModalOpen(false);
      e.target.reset();
      const res = await API.get('/doctors');
      setLists(prev => ({ ...prev, doctors: res.data.doctors }));
    } catch (error) {
      setLists(prev => ({ ...prev, doctors: prev.doctors.filter(d => d._id !== tempId) }));
      toast.error(error.response?.data?.message || "Failed to create doctor");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ FIX 3: CORRECTED SEARCH FUNCTION
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // We don't change the main 'lists' state, we just filter for display
    // But if you want to persist the filtered list in state:
    if (activeTab === 'users') {
      const filtered = lists.users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
      setLists(prev => ({ ...prev, users: filtered }));
    }
    // You can add else if for doctors/patients if you want search to persist across renders
    // However, usually filtering is done in the render variable or a separate derived state.
    // For this snippet, I'll keep it simple: searchTerm state updates, and you use it to filter data before rendering.
  };

  // 2. Add Patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const tempId = 'temp-' + Date.now();
    const newPat = { _id: tempId, ...data, role: 'user' };
    setLists(prev => ({ ...prev, patients: [...prev.patients, newPat] }));

    try {
      await API.post('/users/admin/create-patient', data);
      toast.success("Patient added successfully");
      setModalOpen(false);
      e.target.reset();
    } catch (error) {
      setLists(prev => ({ ...prev, patients: prev.patients.filter(p => p._id !== tempId) }));
      toast.error(error.response?.data?.message || "Failed to add patient");
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Delete Generic
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    const key = type === 'doctor' ? 'doctors' : (type === 'patient' ? 'patients' : 'users');
    const oldList = lists[key];
    setLists(prev => ({ ...prev, [key]: prev[key].filter(i => i._id !== id) }));

    try {
      if (type === 'doctor') await API.delete(`/doctors/${id}`);
      else await API.delete(`/users/user/${id}`);
      toast.success(`${type} deleted successfully`);
    } catch (error) {
      setLists(prev => ({ ...prev, [key]: oldList }));
      toast.error("Failed to delete");
    }
  };

  // 4. Status Update for Appointments
  const handleStatusUpdate = async (id, newStatus) => {
    const oldAppointments = [...lists.appointments];
    setLists(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a._id === id ? { ...a, status: newStatus } : a)
    }));

    try {
      await API.put(`/appointments/admin/update/${id}`, { status: newStatus });
      toast.success(`Appointment ${newStatus}`);
    } catch (error) {
      setLists(prev => ({ ...prev, appointments: oldAppointments }));
      toast.error("Failed to update status");
    }
  };

  // 5. APPROVE DOCTOR
  const handleApproveDoctor = async (id) => {
    const oldDoctors = [...lists.doctors];

    // Optimistic Update
    setLists(prev => ({
      ...prev,
      doctors: prev.doctors.map(d =>
        d._id === id ? { ...d, isApproved: true } : d
      )
    }));

    try {
      await API.put(`/doctors/${id}`, { isApproved: true });
      toast.success("Doctor Approved Successfully");
    } catch (error) {
      setLists(prev => ({ ...prev, doctors: oldDoctors }));
      toast.error(error.response?.data?.message || "Failed to approve doctor");
    }
  };

  // ━━━━ CLIENT SIDE FILTERING (For Display) ━━━━

  // Filter Users based on search term
  const filteredUsers = lists.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Doctors
  const filteredDoctors = lists.doctors.filter(d =>
    d?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Patients
  const filteredPatients = lists.patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Appointments
  const filteredAppointments = lists.appointments.filter(apt =>
    apt?.patient?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ━━━━ CHART DATA ━━━━
  const chartData = {
    weekly: [
      { name: 'Mon', appointments: 4, patients: 2 }, { name: 'Tue', appointments: 3, patients: 4 },
      { name: 'Wed', appointments: 5, patients: 1 }, { name: 'Thu', appointments: 2, patients: 3 },
      { name: 'Fri', appointments: 6, patients: 5 }
    ],
    growth: [
      { month: 'Jan', patients: 10 }, { month: 'Feb', patients: 15 },
      { month: 'Mar', patients: 25 }, { month: 'Apr', patients: 40 },
      { month: 'May', patients: 55 }, { month: 'Jun', patients: lists.patients.length }
    ],
    status: [
      { name: 'Pending', value: lists.appointments.filter(a => a.status === 'Pending').length, color: '#f59e0b' },
      { name: 'Confirmed', value: lists.appointments.filter(a => a.status === 'Approved').length, color: '#3b82f6' },
      { name: 'Completed', value: lists.appointments.filter(a => a.status === 'Completed').length, color: '#10b981' },
      { name: 'Cancelled', value: lists.appointments.filter(a => a.status === 'Rejected').length, color: '#ef4444' }
    ]
  };

  // ━━━━ RETURN ━━━━
  return (
    <div className="space-y-8 p-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Admin Console</h1>
        <button onClick={() => { setModalType('doctor'); setModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all">
          <Plus size={18} /> Add Doctor
        </button>
      </div>

      {/* TABS */}
      <div className={`bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border flex space-x-2 overflow-x-auto ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        {[
          { id: "overview", label: "Overview", icon: <Layout size={18} /> },
          { id: "users", label: "Users", icon: <Users size={18} /> },
          { id: "doctors", label: "Doctors", icon: <Stethoscope size={18} /> },
          { id: "patients", label: "Patients", icon: <Users size={18} /> },
          { id: "appointments", label: "Appointments", icon: <Calendar size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'
              }`}
          >
            {tab.icon} <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Users" value={lists.users.length} trend="+12%" icon={<Users />} color="blue" />
              <StatCard title="Doctors" value={lists.doctors.length} trend="+5%" icon={<Stethoscope />} color="purple" />
              <StatCard title="Patients" value={lists.patients.length} trend="+8%" icon={<Users />} color="emerald" />
              <StatCard title="Appointments" value={lists.appointments.length} trend="+3%" icon={<Calendar />} color="orange" />
            </div>
            {/* Charts... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={200}><BarChart data={chartData.weekly}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#e2e8f0"} /><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: darkMode ? "#1e293b" : "#fff", border: "none", color: darkMode ? "#fff" : "#000" }} /><Legend /><Bar dataKey="appointments" fill="#3b82f6" name="Apts" /></BarChart></ResponsiveContainer>
              </div>
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Patient Growth</h3>
                <ResponsiveContainer width="100%" height={200}><LineChart data={chartData.growth}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#e2e8f0"} /><XAxis dataKey="month" stroke="#94a3b8" fontSize={12} /><YAxis stroke="#94a3b8" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: darkMode ? "#1e293b" : "#fff", border: "none" }} /><Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} /></LineChart></ResponsiveContainer>
              </div>
              <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Status</h3>
                <ResponsiveContainer width="100%" height={200}><PieChart><Pie data={chartData.status} innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">{chartData.status.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: darkMode ? "#1e293b" : "#fff", border: "none" }} /><Legend /></PieChart></ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. USERS TAB */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DataTable
              columns={["User", "Email", "Role", "Actions"]}
              data={filteredUsers}
              renderRow={(user) => (
                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-slate-500">{user.email}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs font-bold uppercase">{user.role}</span></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(user._id, 'user')} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button></td>
                </tr>
              )}
            />
          </motion.div>
        )}

        {/* 3. DOCTORS TAB */}
        {activeTab === "doctors" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button onClick={() => { setModalType('doctor'); setModalOpen(true); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus size={16} /> Add Doctor</button>
            </div>

            <DataTable
              columns={["Doctor", "Specialization", "Contact", "Timing", "Status", "Actions"]}
              data={filteredDoctors}
              renderRow={(doc) => (
                <tr key={doc._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600">
                      {doc.user?.name?.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{doc.user?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{doc.specialization}</td>
                  <td className="px-6 py-4 text-slate-600">{doc.contact}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs">{doc.timing}</td>
                  <td className="px-6 py-4"><StatusBadge status={doc.isApproved ? 'Active' : 'Inactive'} /></td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button className="p-1.5 hover:bg-slate-100 rounded text-blue-600"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(doc._id, 'doctor')} className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 size={16} /></button>
                    {!doc.isApproved && (
                      <button
                        onClick={() => handleApproveDoctor(doc._id)}
                        className="p-1.5 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
                        title="Approve Doctor"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              )}
            />
          </motion.div>
        )}

        {/* 4. PATIENTS TAB */}
        {activeTab === "patients" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button onClick={() => { setModalType('patient'); setModalOpen(true); }} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus size={16} /> Add Patient</button>
            </div>
            <DataTable
              columns={["Patient", "Email", "Phone", "Disease", "Actions"]}
              data={filteredPatients}
              renderRow={(pat) => (
                <tr key={pat._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600">
                      {pat.name?.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{pat.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{pat.email}</td>
                  <td className="px-6 py-4 text-slate-600">{pat.contact}</td>
                  <td className="px-6 py-4 text-slate-600">{pat.disease || '-'}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => handleDelete(pat._id, 'patient')} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button></td>
                </tr>
              )}
            />
          </motion.div>
        )}

        {/* 5. APPOINTMENTS TAB */}
        {activeTab === "appointments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            <DataTable
              columns={["Patient", "Doctor", "Date & Time", "Status", "Actions"]}
              data={filteredAppointments}
              renderRow={(apt) => (
                <tr key={apt._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{apt.patient?.user?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{apt.doctor?.user?.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="text-xs">{new Date(apt.date).toLocaleDateString()}</div>
                    <div className="text-xs text-slate-400">{apt.time}</div>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={apt.status === 'Approved' ? 'Confirmed' : apt.status} /></td>
                  <td className="px-6 py-4 flex gap-2">
                    {apt.status === 'Pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(apt._id, 'Approved')} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Check size={16} /></button>
                        <button onClick={() => handleStatusUpdate(apt._id, 'Rejected')} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"><XCircle size={16} /></button>
                      </>
                    )}
                  </td>
                </tr>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━ MODALS ━━━━ */}

      {/* ADD DOCTOR MODAL */}
      <Modal isOpen={modalOpen && modalType === "doctor"} onClose={() => setModalOpen(false)} title="Add New Doctor">
        <form onSubmit={handleAddDoctor} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" required className="col-span-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="email" type="email" placeholder="Email" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="password" type="password" placeholder="Password" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="gender" className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>
            <input name="contact" placeholder="Phone Number" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="specialization" placeholder="Specialization" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="fees" type="number" placeholder="Consultation Fee (PKR)" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="timing" placeholder="Timing (e.g. 9AM-5PM)" required className="col-span-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div><label className="text-sm font-semibold text-slate-700 mb-2 block">Available Days</label>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <label key={day} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-slate-50"><input type="checkbox" name="days" value={day} className="rounded text-blue-600" /><span className="text-sm">{day}</span></label>
              ))}</div></div>
          <textarea name="bio" placeholder="Short Bio / Description" rows="3" className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={actionLoading} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50">{actionLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Create Doctor'}</button>
          </div>
        </form>
      </Modal>

      {/* ADD PATIENT MODAL */}
      <Modal isOpen={modalOpen && modalType === "patient"} onClose={() => setModalOpen(false)} title="Add New Patient">
        <form onSubmit={handleAddPatient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="email" type="email" placeholder="Email" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="password" type="password" placeholder="Password" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <select name="bloodGroup" className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select Blood Group</option>{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}</select>
            <input name="contact" placeholder="Phone Number" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="disease" placeholder="Disease / Condition" required className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={actionLoading} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50">{actionLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Add Patient'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// ✅ ADDITIONAL HELPER COMPONENT FOR MODAL
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} /> {/* Now X is defined */}
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;