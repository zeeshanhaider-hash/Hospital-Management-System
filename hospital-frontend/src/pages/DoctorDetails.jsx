// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import API from '../api/axios';
// import { UserContext } from '../context/UserContext';
// import Loader from '../components/common/Loader';
// import { FiClock, FiDollarSign, FiPhone, FiCalendar, FiArrowLeft } from 'react-icons/fi';

// const DoctorDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = React.useContext(UserContext);
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctorDetails();
//   }, [id]);

//   const fetchDoctorDetails = async () => {
//     try {
//       const { data } = await API.get(`/doctors/${id}`);
//       setDoctor(data.doctor);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   if (!doctor) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="text-center">
//           <span className="text-6xl">😕</span>
//           <p className="mt-4 text-gray-500">Doctor not found</p>
//           <Link to="/doctors" className="text-blue-600 hover:underline mt-2 inline-block">
//             Back to Doctors
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6"
//         >
//           <FiArrowLeft />
//           <span>Back</span>
//         </button>

//         {/* Doctor Card */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white">
//             <div className="flex flex-col sm:flex-row items-center gap-6">
//               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-5xl">👨‍⚕️</span>
//               </div>
//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold">{doctor.user?.name}</h1>
//                 <p className="text-blue-100 text-lg mt-1">{doctor.specialization}</p>
//                 <p className="text-blue-200 text-sm mt-2">{doctor.user?.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="p-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiDollarSign className="text-green-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Consultation Fee</p>
//                   <p className="font-semibold text-lg">Rs. {doctor.fees}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiClock className="text-blue-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Timing</p>
//                   <p className="font-semibold">{doctor.timing}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiPhone className="text-purple-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Contact</p>
//                   <p className="font-semibold">{doctor.contact}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <FiCalendar className="text-orange-500 text-xl" />
//                 <div>
//                   <p className="text-sm text-gray-500">Available Days</p>
//                   <p className="font-semibold">{doctor.days?.join(', ')}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Status */}
//             <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg mb-6">
//               <div>
//                 <span className="text-yellow-700 font-medium">
//                   {doctor.isApproved ? '✓ Verified Doctor' : '⏳ Verification Pending'}
//                 </span>
//               </div>
//             </div>

//             {/* Book Button */}
//             {user && doctor.isApproved && (
//               <Link
//                 to={`/book-appointment/${doctor._id}`}
//                 className="block w-full py-4 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Book Appointment
//               </Link>
//             )}

//             {!user && (
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-gray-600">
//                   Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> to book an appointment
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDetails;