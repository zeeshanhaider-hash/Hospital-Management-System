import React, { useState, useEffect, useContext } from "react";
import API from "../../api/axios";
import { AppContext } from "../../context/AppContext";
import {
  Calendar,
  Users,
  Pill,
  DollarSign,
  CheckCircle, 
  XCircle,    
  FileText,   
  Loader2,    
  Download,
  Printer,
  X,          // Added for closing modal
  Activity,   // Added for history icon
  Stethoscope // Added for history icon
} from "lucide-react";
import toast from "react-hot-toast"; 

const DoctorDashboard = () => {
  const { darkMode, user } = useContext(AppContext);

  // STATES
  const [activeTab, setActiveTab] = useState("appointments");
  const [data, setData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for handling Status Changes
  const [updatingStatus, setUpdatingStatus] = useState(null); 
  const [patientStatusInput, setPatientStatusInput] = useState({}); 

  // --- NEW: STATE FOR HISTORY MODAL ---
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Prescription Form State
  const [medForm, setMedForm] = useState({
    patientId: "",
    medicine: "",
    dosage: "",
  });

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await API.get("/appointments/doctor-appointments");
        const appointments = response?.data?.appointments || [];

        // APPOINTMENTS
        if (activeTab === "appointments") {
          setData(appointments);
        }

        // PATIENTS
        else if (activeTab === "patients") {
          const uniquePatients = appointments.reduce((acc, curr) => {
            const patient = curr?.patient;
            if (patient && patient._id && !acc.find((p) => p._id === patient._id)) {
              acc.push(patient);
            }
            return acc;
          }, []);
          setPatients(uniquePatients);
          setData(uniquePatients);
        }

        // PRESCRIPTIONS
        else if (activeTab === "prescriptions") {
          const uniquePatients = appointments.reduce((acc, curr) => {
            const patient = curr?.patient;
            if (patient && patient._id && !acc.find((p) => p._id === patient._id)) {
              acc.push(patient);
            }
            return acc;
          }, []);
          setPatients(uniquePatients);
          const medicines = appointments.reduce((acc, curr) => {
            if (curr?.patient?.medicines) {
              return [...acc, ...curr.patient.medicines];
            }
            return acc;
          }, []);
          setData(medicines);
        }

        // BILLING
        else if (activeTab === "billing") {
          const bills = appointments
            .filter((a) => a.status === "Completed")
            .map((a) => ({
              id: a._id,
              date: a.date,
              patient: a?.patient?.user?.name || "Unknown",
              amount: a?.doctor?.fees || 0,
            }));
          setData(bills);
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // --- NEW: HANDLE VIEW HISTORY ---
  const handleViewHistory = async (patientId) => {
    setShowHistoryModal(true);
    setHistoryLoading(true);
    setSelectedPatientHistory(null);

    try {
      // Assuming you have an endpoint to get full patient details by ID
      // If not, we use the data we already have
      const fullPatient = patients.find(p => p._id === patientId);
      setSelectedPatientHistory(fullPatient);
    } catch (error) {
      toast.error("Failed to load history");
      setShowHistoryModal(false);
    } finally {
      setHistoryLoading(false);
    }
  };

  // --- NEW: HANDLE PRESCRIBE CLICK ---
  const handlePrescribeClick = (patientId) => {
    // 1. Set the patient in the form
    setMedForm({
      patientId: patientId,
      medicine: "",
      dosage: "",
    });
    
    // 2. Switch to Prescriptions Tab automatically
    setActiveTab("prescriptions");
    
    // 3. Scroll to top (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- HANDLE STATUS UPDATE ---
  const handleStatusUpdate = async (aptId, newStatus) => {
    setUpdatingStatus(aptId);
    try {
      await API.put(`/appointments/doctor/update/${aptId}`, { status: newStatus });
      let message = `Appointment ${newStatus}`;
      if (newStatus === 'Completed') message = "Bill Generated Successfully!";
      toast.success(message);
      setData(prev => prev.map(apt => apt._id === aptId ? { ...apt, status: newStatus } : apt));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // --- HANDLE PATIENT STATUS SAVE ---
  const handlePatientStatusSave = async (aptId) => {
    const note = patientStatusInput[aptId];
    if (!note) return;
    try {
      toast.success("Patient status updated");
    } catch (error) {
      toast.error("Failed to save status");
    }
  };

  // --- HANDLE PRESCRIPTION SUBMIT ---
  const handlePrescribe = async (e) => {
    e.preventDefault();
    if (!medForm.patientId) {
      alert("Select a patient first");
      return;
    }
    try {
      // await API.post("/prescriptions/create", medForm); // Uncomment when backend is ready
      toast.success(`Prescribed ${medForm.medicine} to patient ID: ${medForm.patientId}`);
      setMedForm({ patientId: "", medicine: "", dosage: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // --- HANDLE PRINT BILL ---
  const handlePrintBill = () => {
    window.print();
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-bold text-slate-600 dark:text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Doctor Console</h1>
          <p className="text-slate-500">Dr. {user?.name || "Doctor"}</p>
        </div>
      </div>

      {/* TABS */}
      <div className={`bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border flex space-x-2 overflow-x-auto ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
        {[
          { id: "appointments", label: "My Appointments", icon: <Calendar size={18} /> },
          { id: "patients", label: "My Patients", icon: <Users size={18} /> },
          { id: "prescriptions", label: "Prescriptions", icon: <Pill size={18} /> },
          { id: "billing", label: "Billing System", icon: <DollarSign size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 capitalize px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* APPOINTMENTS TAB */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          {data.length > 0 ? data.map((apt) => (
            <div key={apt._id} className={`p-6 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full"><Users size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{apt?.patient?.user?.name || "Unknown"}</h4>
                    <p className="text-sm text-slate-500">{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === "Approved" ? "bg-green-100 text-green-700" : apt.status === "Rejected" ? "bg-red-100 text-red-700" : apt.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {apt.status}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 mb-4">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2"><FileText size={14} /> Update Patient Status / Notes</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. Diagnosed with Flu..." className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={patientStatusInput[apt._id] || ""} onChange={(e) => setPatientStatusInput(prev => ({...prev, [apt._id]: e.target.value}))} />
                  <button onClick={() => handlePatientStatusSave(apt._id)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold">Save</button>
                </div>
              </div>
              <div className="flex gap-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                {apt.status === "Pending" && (
                  <>
                    <button onClick={() => handleStatusUpdate(apt._id, 'Approved')} disabled={updatingStatus === apt._id} className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                      {updatingStatus === apt._id ? <Loader2 size={16} className="animate-spin"/> : <><CheckCircle size={16} /> Approve</>}
                    </button>
                    <button onClick={() => handleStatusUpdate(apt._id, 'Rejected')} disabled={updatingStatus === apt._id} className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                      {updatingStatus === apt._id ? <Loader2 size={16} className="animate-spin"/> : <><XCircle size={16} /> Reject</>}
                    </button>
                  </>
                )}
                {apt.status === "Approved" && (
                  <button onClick={() => handleStatusUpdate(apt._id, 'Completed')} disabled={updatingStatus === apt._id} className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-lg">
                    {updatingStatus === apt._id ? <Loader2 size={16} className="animate-spin"/> : <><DollarSign size={16} /> Complete & Generate Bill</>}
                  </button>
                )}
                {apt.status === "Completed" && (
                  <div className="w-full text-center text-green-600 font-bold bg-green-50 py-2 rounded-lg">✅ Consultation Completed & Bill Generated</div>
                )}
              </div>
            </div>
          )) : <p className="text-slate-500 text-center py-8">No appointments found.</p>}
        </div>
      )}

      {/* PATIENTS TAB */}
      {activeTab === "patients" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? data.map((patient) => (
            <div key={patient._id} className={`p-6 rounded-3xl border hover:shadow-lg transition-shadow ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">{patient?.user?.name || "Unknown"}</h4>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600">ID: {patient?._id?.slice(-4)}</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{patient?.disease || "No disease info"}</p>
              
              {/* ✅ UPDATED BUTTONS WITH HANDLERS */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleViewHistory(patient._id)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1"
                >
                  <Activity size={14} /> View History
                </button>
                <button 
                  onClick={() => handlePrescribeClick(patient._id)}
                  className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center justify-center gap-1"
                >
                  <Pill size={14} /> Prescribe
                </button>
              </div>
            </div>
          )) : <p className="text-slate-500">No patients found.</p>}
        </div>
      )}

      {/* PRESCRIPTIONS TAB */}
      {activeTab === "prescriptions" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Prescribe Medicine</h3>
            <form onSubmit={handlePrescribe} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select value={medForm.patientId} onChange={(e) => setMedForm({ ...medForm, patientId: e.target.value })} className="px-4 py-2 bg-transparent border dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white">
                <option value="">Select Patient</option>
                {patients.map((p) => <option key={p._id} value={p._id}>{p?.user?.name}</option>)}
              </select>
              <input type="text" value={medForm.medicine} onChange={(e) => setMedForm({ ...medForm, medicine: e.target.value })} placeholder="Medicine Name" required className="px-4 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 outline-none" />
              <input type="text" value={medForm.dosage} onChange={(e) => setMedForm({ ...medForm, dosage: e.target.value })} placeholder="Dosage (e.g. 1x Daily)" required className="px-4 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 outline-none" />
              <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700">Send Prescription</button>
            </form>
          </div>
          <div className={`rounded-3xl border p-6 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
            <h4 className="font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</h4>
            <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"><Pill className="text-purple-500" size={16} /><p className="text-sm text-slate-600 dark:text-slate-300">Patient #{1000 + i} - Prescribed Amoxicillin</p></div>)}</div>
          </div>
        </div>
      )}

      {/* BILLING TAB */}
      {activeTab === "billing" && (
        <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Billing Reports</h3>
            <button onClick={handlePrintBill} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2">
              <Printer size={16} /> Print All Bills
            </button>
          </div>
          {data.length > 0 ? (
            <div className="space-y-4">
              {data.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{bill.patient}</p>
                    <p className="text-sm text-slate-500">{new Date(bill.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-green-600 text-lg">${bill.amount}</div>
                    <button onClick={handlePrintBill} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Download Bill"><Download size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-slate-500 text-center py-8">No billing records found. Complete an appointment to generate a bill.</p>}
        </div>
      )}

      {/* ✅ HISTORY MODAL */}
      {showHistoryModal && selectedPatientHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up`}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex justify-between items-center text-white">
              <div>
                <h2 className="text-xl font-bold">Patient History</h2>
                <p className="text-blue-100 text-sm">{selectedPatientHistory?.user?.name}</p>
              </div>
              <button onClick={() => setShowHistoryModal(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"><X size={20} /></button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {historyLoading ? (
                <div className="text-center py-8 text-slate-500">Loading history...</div>
              ) : (
                <>
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase">Age</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedPatientHistory?.age || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase">Blood Group</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedPatientHistory?.bloodGroup || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase">Gender</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedPatientHistory?.gender || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase">Contact</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedPatientHistory?.contact || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Disease */}
                  <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                    <p className="text-xs font-bold text-red-500 uppercase mb-1">Current Condition</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">{selectedPatientHistory?.disease || "No specific disease listed."}</p>
                  </div>

                  {/* Medical History (if available in your model) */}
                  {selectedPatientHistory?.history && selectedPatientHistory.history.length > 0 ? (
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Past Records</p>
                      <div className="space-y-2">
                        {selectedPatientHistory.history.map((record, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm">
                            <p className="font-bold text-slate-800 dark:text-white">{record.disease}</p>
                            <p className="text-slate-500">{new Date(record.treatmentDate).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 text-center italic">No previous medical history found.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;