import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white fixed left-0 top-16">
      <div className="flex flex-col h-full px-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <span className="font-bold text-xl">ZH-Care</span>
          </div>
          <div className="text-xl font-bold">Admin Panel</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col space-y-4">

          <Link to="/dashboard" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
            <FiHome className="text-xl" />
            <span>Overview</span>
          </Link>

          <Link to="/dashboard/doctors" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
            <FiUsers className="text-xl" />
            <span>Doctors List</span>
          </Link>

          <Link to="/dashboard/patients" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
            <FiUsers className="text-xl" />
            <span>Patients List</span>
          </Link>

          <Link to="/dashboard/appointments" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
            <FiMenu className="text-xl" />
            <span>Appointments</span>
          </Link>

          <Link to="/dashboard/billing" className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
            <FiSettings className="text-xl" />
            <span>Billing</span>
          </Link>

          {/* Logout */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <button
              onClick={() => {}}
              className="flex items-center space-x-3 text-red-400 hover:text-red-500 transition-colors"
            >
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;