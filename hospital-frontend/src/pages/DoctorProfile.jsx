import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { AppContext } from '../context/AppContext';
import { 
  Calendar, Clock, DollarSign, MapPin, Phone, 
  ArrowLeft, CheckCircle, Loader2, Stethoscope 
} from 'lucide-react';

const DoctorProfile = () => {
  const { user, darkMode } = React.useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ date: '', time: '' });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await API.get(`/doctors/${id}`);
        setDoctor(data.doctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id, navigate]);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      await API.post('/appointments/create', { doctor: id, ...formData });
      alert("Appointment Request Sent Successfully!");
      navigate('/my-appointments');
    } catch (error) {
      console.error(error);
      alert("Failed to book: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-slate-50"><Loader2 className="animate-spin text-blue-600"/></div>;
  if (!doctor) return <div className="flex justify-center items-center min-h-screen bg-slate-50 text-slate-500">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
             <Link to="/" className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                <ArrowLeft size={20} />
             </Link>
             <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dr. {doctor.user?.name}</h1>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
             doctor.isApproved 
               ? 'bg-green-100 text-green-700 border-green-300' 
               : 'bg-yellow-100 text-yellow-700 border-yellow-300'
          }`}>
             {doctor.isApproved ? 'Verified' : 'Pending'}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT COLUMN: Doctor Details */}
          <div className="space-y-6">
             <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                
                <div className="flex items-center gap-6 mb-6">
                     <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        {doctor.avatar?.url && !doctor.avatar.url.includes('default') ? (
                           <img src={doctor.avatar.url} alt={doctor.user?.name} className="w-full h-full object-cover" />
                        ) : (
                           <span className="text-5xl">👨‍⚕️</span>
                        )}
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{doctor.user?.name}</h2>
                        <p className="text-blue-600 font-medium text-lg">{doctor.specialization}</p>
                        <p className="text-slate-500 text-sm mt-1">{doctor.user?.email}</p>
                     </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t dark:border-slate-700">
                   <div className="flex items-center gap-3">
                        <DollarSign className="text-green-500" size={20} />
                        <div>
                             <p className="text-xs text-slate-500 uppercase">Consultation Fee</p>
                             <p className="text-lg font-bold text-slate-900 dark:text-white">Rs. {doctor.fees}</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-3">
                        <Clock className="text-blue-500" size={20} />
                        <div>
                             <p className="text-xs text-slate-500 uppercase">Timing</p>
                             <p className="text-lg font-bold text-slate-900 dark:text-white">{doctor.timing}</p>
                        </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t dark:border-slate-700">
                   <div className="flex items-center gap-3">
                        <Phone className="text-purple-500" size={20} />
                        <div>
                             <p className="text-xs text-slate-500 uppercase">Contact</p>
                             <p className="text-base font-medium text-slate-900 dark:text-white">{doctor.contact}</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-3">
                        <MapPin className="text-orange-500" size={20} />
                        <div>
                             <p className="text-xs text-slate-500 uppercase">Location</p>
                             <p className="text-base font-medium text-slate-900 dark:text-white">Medical Center, City</p>
                        </div>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN: Book Appointment */}
          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
               <Stethoscope className="text-blue-500"/> Book Appointment
             </h3>
             
             <form onSubmit={handleBookAppointment} className="space-y-5">
                <div>
                     <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Date</label>
                     <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                     />
                </div>

                <div>
                     <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Time</label>
                     <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                     />
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-500">
                     <CheckCircle size={16} />
                     <span>Available on {doctor.days?.join(', ')}</span>
                </div>

                <button 
                     type="submit"
                     disabled={!doctor.isApproved}
                     className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                        !doctor.isApproved 
                          ? 'bg-slate-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/30'
                     }`}
                >
                     {!doctor.isApproved ? 'Doctor Not Verified' : 'Confirm Booking'}
                </button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;