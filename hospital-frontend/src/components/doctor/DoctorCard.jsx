import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';

const DoctorCard = ({ doctor }) => {
  const { _id, specialization, fees, timing, days, user, isApproved } = doctor;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover group">
      {/* Top Color Bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
      
      <div className="p-6">
        {/* Doctor Info */}
        <div className="flex items-start space-x-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-emerald-50 transition-colors">
            👨‍⚕️
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 text-lg truncate">{user?.name || 'Doctor'}</h3>
            <p className="text-emerald-600 text-sm font-medium">{specialization}</p>
            <div className="flex items-center space-x-1 text-slate-400 text-xs mt-1">
              <FiMapPin size={12} />
              <span>{timing}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
            <p className="text-xs text-slate-400 mb-0.5">Fee</p>
            <p className="text-sm font-bold text-slate-700 flex items-center"><FiDollarSign size={14} className="text-emerald-500 mr-1"/>{fees} PKR</p>
          </div>
          <div className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
            <p className="text-xs text-slate-400 mb-0.5">Status</p>
            <p className={`text-sm font-bold ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isApproved ? '✓ Verified' : '⏳ Pending'}
            </p>
          </div>
        </div>

        {/* Available Days Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {days?.slice(0, 4).map((day, index) => (
            <span key={index} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg border border-slate-100 font-medium">
              {day.slice(0, 3)}
            </span>
          ))}
          {days?.length > 4 && <span className="text-xs text-slate-400 px-2 py-1">+{days.length - 4} more</span>}
        </div>

        {/* Action Button */}
        {isApproved ? (
          <Link
            to={`/doctor/${_id}`}
            className="block w-full py-3 text-center text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100"
          >
            View Profile
          </Link>
        ) : (
          <button disabled className="block w-full py-3 text-center text-sm font-semibold text-slate-400 bg-slate-50 rounded-xl cursor-not-allowed border border-slate-100">
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;