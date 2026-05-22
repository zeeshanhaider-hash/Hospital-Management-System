import React from 'react';

const AppointmentCard = ({ appointment }) => {
  const { date, time, status, doctor } = appointment;

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Approved: 'bg-green-100 text-green-700 border-green-300',
    Rejected: 'bg-red-100 text-red-700 border-red-300',
    Completed: 'bg-blue-100 text-blue-700 border-blue-300',
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Doctor Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl">👨‍⚕️</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {doctor?.user?.name || 'Doctor'}
            </h3>
            <p className="text-sm text-gray-500">{doctor?.specialization}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="text-center sm:text-right">
          <p className="text-gray-600 text-sm">
            {new Date(date).toLocaleDateString('en-PK', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="text-blue-600 font-medium">{time}</p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${
            statusColors[status] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;