import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext'; // Adjust path
import { 
  FaUserMd, 
  FaBed, 
  FaDollarSign, 
  FaHeadset, 
  FaArrowUp, 
  FaArrowDown 
} from 'react-icons/fa';

const StatCard = ({ title, value, icon, trend, trendUp, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 transition transform hover:scale-105 duration-300"
         style={{ borderColor: color }}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {typeof value === 'number' && title.includes('$') ? '$' + value.toLocaleString() : value}
          </h3>
        </div>
        <div 
          className={`p-4 rounded-full bg-opacity-20 text-2xl`}
          style={{ backgroundColor: color, color: color }}
        >
          {icon}
        </div>
      </div>
      
      {/* Trend Indicator */}
      <div className="mt-4 flex items-center text-sm">
        {trendUp ? (
          <span className="text-green-500 flex items-center font-semibold">
            <FaArrowUp className="mr-1" /> {trend}%
          </span>
        ) : (
          <span className="text-red-500 flex items-center font-semibold">
            <FaArrowDown className="mr-1" /> {trend}%
          </span>
        )}
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const { stats } = useContext(AppContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Users */}
        <StatCard 
          title="Total Users" 
          value={stats.usersCount} 
          icon={<FaUserMd />} 
          color="#3B82F6" // Blue
          trend={12} 
          trendUp={true} 
        />

        {/* Available Beds */}
        <StatCard 
          title="Available Beds" 
          value={stats.bedsCount} 
          icon={<FaBed />} 
          color="#10B981" // Green
          trend={5} 
          trendUp={true} 
        />

        {/* Revenue */}
        <StatCard 
          title="Total Revenue" 
          value={stats.revenue} 
          icon={<FaDollarSign />} 
          color="#F59E0B" // Amber
          trend={8} 
          trendUp={true} 
        />

        {/* Support Tickets */}
        <StatCard 
          title="Pending Support" 
          value={stats.supportTickets} 
          icon={<FaHeadset />} 
          color="#EF4444" // Red
          trend={2} 
          trendUp={false} 
        />
      </div>

      {/* Extra "Impressive" Section: Recent Activity & Charts Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
             {[1, 2, 3].map((item) => (
               <div key={item} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                   JD
                 </div>
                 <div className="ml-4 flex-1">
                   <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">John Doe</p>
                   <p className="text-xs text-gray-500">New patient registered</p>
                 </div>
                 <span className="text-xs text-gray-400">2h ago</span>
               </div>
             ))}
          </div>
        </div>

        {/* Announcements / Support */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white">
          <h3 className="text-lg font-bold mb-2">System Status</h3>
          <p className="text-sm opacity-90 mb-4">All servers are running smoothly. Backups completed 2 hours ago.</p>
          <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
            View Logs
          </button>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;