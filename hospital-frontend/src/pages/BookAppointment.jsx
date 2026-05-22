import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";
import { AppContext } from "../context/AppContext";
import { 
  Calendar, Clock, ArrowLeft, Check, X, Stethoscope, 
  User, Info, AlertCircle, Loader2, MapPin, CheckCircle  // ✅ Fix 4: Added CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(AppContext);
  
  // STATE
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ date: '', time: '' });
  
  // Confirmation Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [summary, setSummary] = useState(null);

  // Fetch Doctor
  useEffect(() => { fetchDoctorDetails(); }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      const { data } = await API.get(`/doctors/${doctorId}`);
      setDoctor(data.doctor);
    } catch (error) { 
      console.error("Error fetching doctor:", error);
      toast.error('Failed to load doctor details'); 
    } finally { 
      setLoading(false); 
    }
  };

  // Handle Quick Day Selection (e.g., User clicks "Monday" pill)
  const handleDaySelect = (dayName) => {
    // Find the next occurrence of this day from today
    const today = new Date();
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = daysMap.indexOf(dayName);
    
    let nextDate = new Date(today);
    let diff = targetDayIndex - today.getDay();
    if (diff <= 0) diff += 7; // If today is the day, go to next week
    
    nextDate.setDate(today.getDate() + diff);
    const dateString = nextDate.toISOString().split('T')[0];
    
    setFormData(prev => ({ ...prev, date: dateString }));
  };

  // Validation Helper
  const validateAvailability = () => {
    if (!doctor) {
      toast.error("Doctor data loading...");
      return false;
    }

    if (!formData.date) {
      toast.error("Please select a date");
      return false;
    }

    if (!formData.time) {
      toast.error("Please select a time");
      return false;
    }

    const selectedDate = new Date(formData.date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNameLower = dayName.toLowerCase();

    // 1. Check Day Availability
    if (doctor.days && doctor.days.length > 0) {
        const availableDays = doctor.days.map(d => d.toLowerCase());
        if (!availableDays.includes(dayNameLower)) {
            toast.error(`Dr. ${doctor.user?.name} is not available on ${dayName}. Available: ${doctor.days.join(', ')}`);
            return false;
        }
    }

    // 2. Check Timing Availability (Basic Check)
    // Assuming timing is "9:00 AM - 5:00 PM". In a real app, parse this string and compare logic.
    // For now, we assume any time is valid if the day is valid.
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAvailability()) {
      // Prepare summary data
      setSummary({
        doctorName: doctor.user?.name,
        date: new Date(formData.date).toLocaleDateString(),
        time: formData.time,
        fees: doctor.fees
      });
      setShowConfirmModal(true);
    }
  };

    const finalSubmit = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    try {
      await API.post('/appointments/create', { 
        doctor: doctorId, 
        date: formData.date, 
        time: formData.time 
      });
      
      toast.success('Appointment Booked Successfully!');
      navigate('/my-appointments');
    } catch (error) { 
      console.error("Booking error:", error);
      const msg = error.response?.data?.message || "Booking failed. Please try again.";
      
      // ✅ SPECIFIC FIX: If backend still says "Patient profile not found"
      if (msg.includes("Patient profile") || msg.includes("profile not found")) {
         toast.error("Please complete your medical profile first.");
         // Redirect them to the profile creation page
         setTimeout(() => navigate('/patient-profile'), 2000); 
      } else {
         toast.error(msg); 
      }
    } finally { 
      setSubmitting(false); 
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // --- RENDER ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50"> {/* ✅ Fix 1: removed duplicate `flex` */}
      <Loader2 className="animate-spin text-blue-600" size={32} /> {/* ✅ Fix 2 & 3: closed className string, moved size outside */}
    </div>
  );
  
  if (!doctor) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertCircle className="text-red-500 mb-4" size={48} />

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Doctor Not Found
      </h2>

      <p className="text-slate-500 mb-6">
        We couldn't load the details for this doctor.
      </p>

      <Link
        to="/doctors"
        className="text-blue-600 hover:underline font-bold"
      >
        Browse All Doctors
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link 
            to={`/doctor/${doctorId}`} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Book Appointment
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: BOOKING FORM */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="text-blue-600" size={24} />
                Select Date & Time
              </h3>

              {/* Day Selection Pills */}
              {doctor.days && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    Available Days (Click to Auto-fill)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.days.map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDaySelect(day)}
                        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <Calendar className="inline mr-2 text-blue-500" />Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={today}
                    required
                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-slate-900 dark:text-white transition-colors font-medium"
                  />
                </div>

                {/* Time Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    <Clock className="inline mr-2 text-emerald-500" />Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-slate-900 dark:text-white transition-colors font-medium"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">Clinic Hours: <span className="font-bold text-slate-600 dark:text-slate-300">{doctor.timing}</span></p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 to-teal-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review & Book
              </button>
            </form>
          </div>

          {/* RIGHT: STICKY DOCTOR PROFILE CARD */}
          <div className="lg:col-span-1 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 flex items-center gap-4 relative overflow-hidden">
                <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border border-white/30 shadow-inner">
                   👨‍⚕️
                </div>
                <div className="relative z-10 text-white">
                  <h2 className="text-xl font-bold">{doctor.user?.name}</h2>
                  <p className="text-emerald-100 text-sm font-medium">{doctor.specialization}</p>
                  <div className="flex items-center gap-2 mt-1 text-emerald-200 text-xs font-bold">
                    <span className="bg-white/20 px-2 py-0.5 rounded">PKR {doctor.fees}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0"></div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                  <Stethoscope size={18} className="text-emerald-600" />
                  <span>{doctor.specialization}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                  <MapPin size={18} className="text-emerald-600" />
                  <span>{doctor.contact || "Contact Not Available"}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                  <Clock size={18} className="text-emerald-600" />
                  <span>{doctor.timing}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.days && doctor.days.length > 0 ? (
                      doctor.days.map((day, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                          {day}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs">Any Day</span>
                    )
                    }
                  </div>
                </div>

                {doctor.bio && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-2">About</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {doctor.bio}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ✅ CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && summary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 p-0"
            >
              {/* Header */}
              <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <h3 className="font-bold text-lg">Confirm Booking</h3>
                </div>
                <button onClick={() => setShowConfirmModal(false)} className="text-white/80 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Doctor</p>
                    <p className="font-bold text-slate-900 dark:text-white">{summary.doctorName}</p>
                  </div>
                  <div className="text-right font-bold text-emerald-600">
                    PKR {summary.fees}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-bold text-slate-900 dark:text-white">{summary.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">{summary.time}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 text-center">
                  Please confirm the appointment details above.
                </p>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={finalSubmit}
                    disabled={submitting}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookAppointment;

