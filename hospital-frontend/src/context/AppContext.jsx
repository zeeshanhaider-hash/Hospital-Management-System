import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [isAppLoading, setIsAppLoading] = useState(true);
  
  // ✅ State for Dashboard Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    doctorsCount: 0,
    patientsCount: 0,
    revenue: 0,
    supportTickets: 0
  });

  // 🌙 Dark Mode Effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

   // 👤 LOGGED-IN USER
  const getProfile = async () => {
    try {
      // ⚠️ FIX: Check your Backend Route. 
      // If your route is '/users/me' (no slash), remove the slash here.
      // If your route is '/users/me/', keep the slash.
      const { data } = await API.get('/users/me'); 
      setUser(data.user);
    } catch (error) {
      console.log("Get Profile Error:", error);
      setUser(null);
    } finally {
      // ✅ CRITICAL: This MUST run to stop the loading screen!
      setIsAppLoading(false); 
    }
  };
  
  // 👥 Get All Users (from Backend)
  const getAllUsers = async () => {
    try {
      const { data } = await API.get('/users/users');
      setUsers(data.users);
    } catch (error) {
      console.log("Users fetch error:", error);
    }
  };

  // 📊 CALCULATE REAL STATS from fetched 'users'
  useEffect(() => {
    if (users.length > 0) {
      const doctors = users.filter(u => u.role === 'doctor').length;
      const patients = users.filter(u => u.role === 'patient').length;
      
      setStats(prev => ({
        ...prev,
        totalUsers: users.length,
        doctorsCount: doctors,
        patientsCount: patients
      }));
    }
  }, [users]); // Recalculate whenever user list changes

  // 🔄 Load everything on mount
  // src/context/AppContext.jsx

  // 🔄 Load everything
  useEffect(() => {
    const loadData = async () => {
      await getProfile();
      
      // ✅ FIX: COMMENT OUT THIS LINE.
      // It causes 403 error for non-admins.
      // We should fetch users only inside the Admin Dashboard component.
      // await getAllUsers(); 
    };
    loadData();
  }, []);

  // src/context/AppContext.jsx
// ...



  // 🔐 Login
  const loginUser = async (email, password) => {
    try {
      const { data } = await API.post('/users/login', { email, password });
      setUser(data.user);
      toast.success('Login Successful!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
      return { success: false };
    }
  };

  // 📝 Register
  const registerUser = async (name, email, password) => {
    try {
      const { data } = await API.post('/users/register', { name, email, password });
      setUser(data.user);
      toast.success('Account Created!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
      return { success: false };
    }
  };

  // 🩺 Create Doctor (Fixed: Single Toast)
  const createDoctor = async (doctorData) => {
    try {
      await API.post('/users/admin/create-doctor', {
        ...doctorData,
        role: 'doctor'
      });
      
      // Only ONE toast
      toast.success('Doctor Created Successfully!');
      
      // Refresh user list to update stats
      await getAllUsers(); 
      return { success: true };
      
    } catch (error) {
      console.error("Create Doctor Error:", error);
      // Only ONE error toast
      toast.error(error.response?.data?.message || 'Failed to create doctor');
      return { success: false };
    }
  };

  // 🚪 Logout
  const logoutUser = async () => {
    try {
      await API.get('/users/logout');
      setUser(null);
      toast.success('Logged out!');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode: () => setDarkMode(!darkMode),
      user,
      users, 
      stats, // ✅ Expose stats
      isAppLoading,
      loginUser,
      registerUser,
      logoutUser,
      createDoctor
    }}>
      {children}
    </AppContext.Provider>
  );
};