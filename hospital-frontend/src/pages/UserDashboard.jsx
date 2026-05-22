import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FiUser, FiCalendar, FiFileText, FiLock, FiArrowRight } from 'react-icons/fi';

const UserDashboard = () => {
  const { user } = React.useContext(UserContext);

  if (!user) return null;

  const cards = [
    {
      title: 'My Profile',
      description: 'View and update your patient profile',
      icon: <FiUser className="text-2xl" />,
      link: '/patient-profile',
      color: 'bg-blue-500',
    },
    {
      title: 'My Appointments',
      description: 'View all your appointments',
      icon: <FiCalendar className="text-2xl" />,
      link: '/my-appointments',
      color: 'bg-green-500',
    },
    {
      title: 'Book Appointment',
      description: 'Book a new appointment with a doctor',
      icon: <FiFileText className="text-2xl" />,
      link: '/doctors',
      color: 'bg-purple-500',
    },
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: <FiLock className="text-2xl" />,
      link: '/change-password',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}! 👋</h1>
          <p className="text-blue-100 mt-2">
            Manage your healthcare from your personal dashboard
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
              {user.role}
            </span>
            <span className="text-blue-100 text-sm">{user.email}</span>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
            >
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{card.description}</p>
              <span className="text-blue-600 text-sm flex items-center space-x-1 group-hover:space-x-2 transition-all">
                <span>Go</span>
                <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;