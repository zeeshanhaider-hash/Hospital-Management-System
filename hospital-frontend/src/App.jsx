import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AppProvider, AppContext } from './context/AppContext';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

// ✅ FIX 1: IMPORT BOOK APPOINTMENT
import BookAppointment from './pages/BookAppointment';
import DoctorProfile from './pages/DoctorProfile';

// Dashboards
import AdminDashboard from './pages/dashboards/AdminDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import AdminManageUsers from './pages/dashboards/AdminManageUsers';
import AdminDoctors from './pages/AdminDoctors';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import Settings from './pages/Settings';

// User Pages
import PatientProfile from './pages/PatientProfile';
import MyAppointments from './pages/MyAppointments';

// Components
import Loader from './components/common/Loader';
import Chatbot from './components/Chatbot';
import EmergencyBtn from './components/EmergencyBtn';

/* =========================
   PROTECTED ROUTE WRAPPER
========================= */
const ProtectedRoute = ({ children }) => {
  const { user, isAppLoading } = React.useContext(AppContext);

  if (isAppLoading) return <Loader />;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, isAppLoading } = React.useContext(AppContext);
  
  if (isAppLoading) return <Loader />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />; // Kick non-admins
  
  return children;
};

/* =========================
   SMART DASHBOARD INDEX
   Decides which dashboard to show based on role
========================= */
const DashboardIndex = () => {
  const { user, isAppLoading } = React.useContext(AppContext);
  
  if (isAppLoading) return <Loader />;
  
  // Redirect to appropriate dashboard based on role
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'doctor') return <DoctorDashboard />;
  return <PatientDashboard />;
};

/* =========================
   MAIN APP COMPONENT
========================= */
const App = () => (
  <ErrorBoundary>
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <Toaster position="top-right" />
        
        {/* Floating buttons only on Landing Page (public) */}
        <Routes>
          <Route path="/" element={
            <>
              <Chatbot />
              <EmergencyBtn />
              <Landing />
            </>
          } />
          
          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Dashboard Routes (Protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            
            {/* ✅ Use Smart Index Route instead of hard-coded AdminDashboard */}
            <Route index element={<DashboardIndex />} />
            
            {/* Common User Routes (Optional, if you want standalone tabs) */}
            {/* <Route path="patients" element={<PatientDashboard />} /> */}
            {/* <Route path="doctor-dashboard" element={<DoctorDashboard />} /> */}
            
            {/* Admin Only Routes */}
            <Route path="manage-users" element={<AdminRoute><AdminManageUsers /></AdminRoute>} />
            <Route path="doctors" element={<AdminRoute><AdminDoctors /></AdminRoute>} />
            
            {/* Common Appointments & Settings Routes */}
            <Route path="appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          </Route>

          {/* Standalone Protected Pages */}
          <Route path="/patient-profile" element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          } />
 
          <Route path="/my-appointments" element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          } />

          <Route path="/doctor/:id" element={<DoctorProfile />} />

          {/* ✅ FIX 2: ADDED THE BOOK APPOINTMENT ROUTE */}
          <Route path="/book-appointment/:doctorId" element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppProvider>
  </ErrorBoundary>
);

export default App;