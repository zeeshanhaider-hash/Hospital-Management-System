import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import AppointmentCard from '../components/appointment/AppointmentCard';
import Loader from '../components/common/Loader';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointments/my');
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log(appointments);
  

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
            <p className="text-gray-600 mt-1">View all your booked appointments</p>
          </div>
          <Link
            to="/doctors"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiCalendar />
            <span>Book New</span>
          </Link>
        </div>

        {/* Appointments List */}
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <span className="text-6xl">📅</span>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No Appointments Yet</h3>
            <p className="text-gray-500 mt-2">You haven't booked any appointments yet</p>
            <Link
              to="/doctors"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Doctors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;


