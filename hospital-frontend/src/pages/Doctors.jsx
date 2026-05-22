// // pages/Doctors.jsx (or DoctorsList.jsx)
// import React, { useState, useEffect } from 'react';
// import API from '../api/axios'; // ✅ Ensure this imports your axios instance

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDocs = async () => {
//       try {
//         // ✅ CRITICAL: This must match your backend route (e.g., /doctors or /api/v1/doctors)
//         // If your axios base URL is http://localhost:3000/api/v1, 
//         // then this request goes to http://localhost:3000/api/v1/doctors
//         const { data } = await API.get('/doctors'); 
//         setDoctors(data.doctors);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDocs();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>All Doctors</h1>
//       <ul>
//         {doctors.map(doc => <li key={doc._id}>{doc.user?.name}</li>)}
//       </ul>
//     </div>
//   );
// };

// export default Doctors;
import React from 'react'

const Doctors = () => {
  return (
    <div>
     <h1>Doctors Route</h1>
    </div>
  )
}

export default Doctors
