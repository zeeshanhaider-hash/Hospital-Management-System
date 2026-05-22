import React, { useState } from 'react';
// ✅ ENSURE this import matches your file name (AppContext.jsx)
import { AppContext } from '../context/AppContext';
import { Shield, Bell, Moon, Sun, Globe, LogOut, User, Lock, ChevronRight, Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Settings = () => {
  // ✅ Use AppContext
  const { user, darkMode, toggleDarkMode } = React.useContext(AppContext);

  // ✅ STATE for Password
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmNew: ''
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- PASSWORD LOGIC ---
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // 1. Validate
    if (passwords.new.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (passwords.new !== passwords.confirmNew) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 2. Call Backend API
      // ✅ THIS IS YOUR EXISTING BACKEND ENDPOINT
      const { data } = await API.put('/users/update-password', {
        oldPassword: passwords.current,
        newPassword: passwords.new,
        confirmNewPassword: passwords.confirmNew
      });

      toast.success("Password updated successfully!");

      // 3. Reset form
      setPasswords({ current: '', new: '', confirmNew: '' });
      setShowCurrent(false);
      setShowNew(false);

    } catch (error) {
      console.error("Password Error:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500">Manage your account and system preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Appearance Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                  {darkMode ? <Moon size={20} className="text-slate-400" /> : <Sun size={20} className="text-yellow-500" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appearance</h3>
                  <p className="text-sm text-slate-500">Switch between light and dark themes.</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-slate-500">Current: {darkMode ? 'Enabled' : 'Disabled'}</p>
                </div>
                {/* Toggle Switch */}
                <button
                  onClick={toggleDarkMode}
                  className={`w-16 h-9 rounded-full p-1 transition-all duration-300 ease-in-out relative ${darkMode ? 'bg-blue-600 border-blue-600' : 'bg-slate-200 border-slate-200'
                    }`}
                >
                  <div className={`w-7 h-7 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${darkMode ? 'translate-x-4' : 'translate-x-0'
                    }`}>
                    {darkMode ? <Moon size={16} className="m-1 text-blue-600" /> : <Sun size={16} className="m-1 text-yellow-500" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Notifications Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Bell size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-slate-500">Manage alerts and emails.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-white">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 ml-4" />
                  </div>
                </label>
                <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900 dark:text-white">SMS Alerts</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 ml-4" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* System Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Info</h3>
                  <p className="text-sm text-slate-500">Current account details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-sm font-semibold text-slate-500 uppercase">Logged in as</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{user?.name || 'Loading...'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-sm font-semibold text-slate-500 uppercase">Account ID</span>
                  <span className="font-mono text-sm text-slate-900 dark:text-white">
                    {user?._id?.slice(-8) ?? 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-sm font-semibold text-slate-500 uppercase">Role</span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user?.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-200 text-slate-700'
                    }`}>
                    {user?.role || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Card (Password Change) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security</h3>
                  <p className="text-sm text-slate-500">Change your account password.</p>
                </div>
              </div>

              <div className="space-y-6">
                <form onSubmit={handlePasswordChange}>
                  {/* Current Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-slate-900 dark:text-white">Current Password</label>
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {showCurrent ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        required
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswords({ ...passwords, current: '' })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {passwords.current && <X size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-slate-900 dark:text-white">New Password</label>
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {showNew ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        required
                        placeholder="Enter new password (min 8 chars)"
                        minLength={8}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswords({ ...passwords, new: '' })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {passwords.new && <X size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-slate-900 dark:text-white">Confirm New Password</label>
                    </div>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={passwords.confirmNew}
                        onChange={(e) => setPasswords({ ...passwords, confirmNew: e.target.value })}
                        required
                        placeholder="Confirm new password"
                        minLength={8}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold py-4 hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Check size={20} />
                      </>
                    )}
                    <span>{loading ? "Updating Password..." : "Update Password"}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;