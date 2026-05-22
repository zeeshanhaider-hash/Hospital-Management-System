import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { AppContext } from "../../context/AppContext";
import {
  Calendar,
  Stethoscope,
  FileText,
  DollarSign,
  Activity,
  Search,
} from "lucide-react";

const PatientDashboard = () => {
  const { darkMode, user } = useContext(AppContext);

  // STATES
  const [activeTab, setActiveTab] = useState("appointments");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allDoctors, setAllDoctors] = useState([]); // Will now be populated immediately
  const [searchTerm, setSearchTerm] = useState("");

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // 1. ✅ FIX: ALWAYS FETCH DOCTORS (So Stat Card & Search work immediately)
        const docResponse = await API.get("/doctors");
        const doctors = docResponse?.data?.doctors || [];
        setAllDoctors(doctors);

        // 2. FETCH APPOINTMENTS (If needed for Appointments or Billing tab)
        // We only fetch this if we are on appointments or billing to save resources
        if (activeTab === "appointments" || activeTab === "billing") {
          const aptResponse = await API.get("/appointments/my");
          const appointments = aptResponse?.data?.appointments || [];

          if (activeTab === "appointments") {
            setData(appointments);
          } 
          else if (activeTab === "billing") {
            const bills = appointments
              .filter((a) => a.status === "Completed")
              .map((a) => ({
                id: a?._id?.slice(-6),
                date: a.date,
                doctorName: a?.doctor?.user?.name || "Unknown Doctor",
                amount: a?.doctor?.fees || 0,
              }));
            setData(bills);
          }
        } 
        // 3. If on Doctors tab, set data for potential list views (optional)
        else if (activeTab === "doctors") {
            setData(doctors); 
        }

      } catch (error) {
        console.error("Patient Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // FILTERED DOCTORS
  const filteredDoctors = allDoctors.filter(
    (doc) =>
      doc?.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doc?.specialization
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Welcome {user?.name || "Patient"} 
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back to your health portal.
          </p>
        </div>

        <Link
          to="/doctors"
          className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <Calendar size={24} />
          <span>Book Appointment</span>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={activeTab === "appointments" ? data.length : "-"}
          icon={<Activity className="text-blue-500" />}
          color="blue"
        />

        <StatCard
          title="Total Bills"
          value={activeTab === "billing" ? data.length : "-"}
          icon={<DollarSign className="text-green-500" />}
          color="green"
        />

        {/* ✅ This will now show the real number of doctors */}
        <StatCard
          title="Available Doctors"
          value={allDoctors.length}
          icon={<Stethoscope className="text-purple-500" />}
          color="purple"
        />
      </div>

      {/* TABS */}
      <div
        className={`bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border flex space-x-2 overflow-x-auto ${
          darkMode ? "border-slate-800" : "border-slate-100"
        }`}
      >
        {[
          {
            id: "appointments",
            label: "My Appointments",
            icon: <Calendar size={18} />,
          },
          {
            id: "doctors",
            label: "Find Doctors",
            icon: <Stethoscope size={18} />,
          },
          {
            id: "billing",
            label: "My Bills",
            icon: <FileText size={18} />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 capitalize px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* APPOINTMENTS */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No appointments booked yet.
            </p>
          ) : (
            data.map((apt) => (
              <div
                key={apt._id}
                className={`p-6 rounded-2xl border flex items-center justify-between ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                    <Stethoscope size={20} />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {apt?.doctor?.user?.name || "Unknown Doctor"}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    apt.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* DOCTORS */}
      {activeTab === "doctors" && (
        <div className="space-y-6">
          {/* SEARCH */}
          <div
            className={`mb-6 p-4 rounded-2xl border ${
              darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
            }`}
          >
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* DOCTORS GRID */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc._id}
                  className={`p-6 rounded-3xl border hover:shadow-lg transition-shadow ${
                    darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      {doc?.user?.name || "Unknown Doctor"}
                    </h4>

                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        doc?.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {doc?.isApproved ? "Verified" : "Pending"}
                    </span>
                  </div>

                  <p className="text-blue-600 font-medium mb-2">
                    {doc?.specialization || "General"}
                  </p>

                  <p className="text-slate-500 text-sm mb-4">
                    Rs. {doc?.fees || 0}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">
                    {/* ✅ VIEW PROFILE LINK */}
                    <Link
                      to={`/doctor/${doc._id}`}
                      className="flex-1 py-2.5 text-center bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      View Profile
                    </Link>

                    {/* ✅ BOOK APPOINTMENT LINK */}
                    {doc?.isApproved && (
                      <Link
                        to={`/book-appointment/${doc._id}`}
                        className="flex-1 py-2.5 text-center bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                      >
                        Book Now
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 p-10 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <Activity
                className="mx-auto text-slate-300 mb-4"
                size={48}
              />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Doctors Found
              </h3>
              <p className="text-slate-500">
                Please check back later.
              </p>
            </div>
          )}
        </div>
      )}

      {/* BILLING */}
      {activeTab === "billing" && (
        <div
          className={`overflow-x-auto rounded-2xl border ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}
        >
          <table className="w-full text-left">
            <thead
              className={`text-xs uppercase font-semibold text-slate-500 ${
                darkMode ? "bg-slate-800" : "bg-slate-50"
              }`}
            >
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-500">
                    No bills generated yet.
                  </td>
                </tr>
              ) : (
                data.map((bill, index) => (
                  <tr key={index} className="border-b dark:border-slate-800">
                    <td className="px-4 py-3">
                      {new Date(bill.date).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">{bill.doctorName}</td>

                    <td className="px-4 py-3 text-right font-bold text-green-600">
                      Rs. {bill.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// STAT CARD
const StatCard = ({ title, value, icon, color }) => {
  const { darkMode } = useContext(AppContext);

  const colors = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-emerald-500 to-teal-500",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <div
      className={`p-6 rounded-3xl border relative overflow-hidden shadow-sm ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
      }`}
    >
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${
          colors[color] || "from-slate-400 to-slate-500"
        } opacity-10 rounded-full blur-xl -mr-6 -mt-6`}
      />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase">{title}</p>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        <div
          className={`p-3 rounded-2xl bg-gradient-to-br ${
            colors[color] || "from-slate-400 to-slate-500"
          } text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;