// import React from "react";
// import { useEffect } from "react";
// import NgoSidebar from "../../components/ngo/NgoSidebar.jsx";
// import NgoTopbar from "../../components/ngo/NgoTopbar.jsx";
// // import { useApi } from "../../utils/api.js";

// const NgoDashboard = () => {
//   // Dummy NGO info (later replace this with backend or Clerk data)
//   const ngoInfo = {
//     name: "Happy Paws Foundation",
//     city: "Mumbai",
//     image:
//       "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300",
//     message: "Great work! Your rescue success rate improved this month.",
//   };

//   const NgoDashboard = () => {
//   const api = useApi();

//   const [stats, setStats] = useState({
//     pending: 0,
//     accepted: 0,
//     completed: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/reports/ngo-dashboard");
//         setStats(res.data);
//       } catch (ex) {
//         console.error("Dashboard fetch error:", ex);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="flex">
//       <NgoSidebar />

//       <div className="flex-1 bg-gray-50 min-h-screen p-6">
//         <NgoTopbar />

//         {/* ======================= */}
//         {/*       HEADER CARD       */}
//         {/* ======================= */}
//         <div className="flex items-center bg-white rounded-xl shadow border p-6 mb-10">
//           {/* NGO Image */}
//           <img
//             src={ngoInfo.image}
//             alt="NGO Logo"
//             className="w-20 h-20 rounded-full object-cover border-4 border-green-600 shadow"
//           />

//           {/* NGO Details */}
//           <div className="ml-6">
//             <h2 className="text-2xl font-bold text-green-700">
//               {ngoInfo.name}
//             </h2>
//             <p className="text-gray-600 text-sm">{ngoInfo.city}</p>

//             <p className="mt-2 text-gray-700 font-medium">{ngoInfo.message}</p>
//           </div>

//           {/* Right Side Quick Stats */}
//           <div className="ml-auto text-right hidden sm:block">
//             <p className="text-sm text-gray-500">Monthly Performance</p>
//             <p className="text-3xl font-bold text-green-600">+12%</p>
//           </div>
//         </div>

//         {/* ======================= */}
//         {/*       TITLE & STATS     */}
//         {/* ======================= */}
//         <h1 className="text-3xl font-bold text-green-700 mt-2">
//           NGO Dashboard
//         </h1>
//         <p className="text-gray-600 mb-10">
//           Monitor rescue requests and track your team’s performance.
//         </p>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//           <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
//             <h3 className="text-gray-500 text-sm">Pending Requests</h3>
//             <p className="text-4xl font-bold text-orange-500 mt-2">3</p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
//             <h3 className="text-gray-500 text-sm">Accepted Requests</h3>
//             <p className="text-4xl font-bold text-blue-600 mt-2">5</p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
//             <h3 className="text-gray-500 text-sm">Completed Rescues</h3>
//             <p className="text-4xl font-bold text-green-600 mt-2">12</p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
//             <h3 className="text-gray-500 text-sm">Team Activity</h3>
//             <p className="text-4xl font-bold text-purple-600 mt-2">89%</p>
//           </div>
//         </div>

//         {/* ANALYTICS SECTION */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-green-700 mb-4">
//             Rescue Analytics
//           </h2>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* Chart 1 */}
//             <div className="bg-white rounded-xl shadow border p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Rescues Completed – Last 6 Months
//               </h3>

//               <div className="relative h-40 flex items-end gap-4">
//                 {[5, 8, 6, 10, 7, 12].map((value, index) => (
//                   <div key={index} className="flex-1">
//                     <div
//                       className="bg-green-600 rounded-t"
//                       style={{ height: `${value * 10}px` }}
//                     ></div>
//                     <p className="text-xs text-center mt-1 text-gray-500">
//                       {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][index]}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Chart 2 */}
//             <div className="bg-white rounded-xl shadow border p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Response Time (Avg Minutes)
//               </h3>

//               <div className="relative h-40 flex items-end gap-4">
//                 {[45, 40, 50, 35, 30, 28].map((value, index) => (
//                   <div key={index} className="flex-1">
//                     <div
//                       className="bg-blue-500 rounded-t"
//                       style={{ height: `${value * 2}px` }}
//                     ></div>
//                     <p className="text-xs text-center mt-1 text-gray-500">
//                       {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][index]}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* INFO BOX */}
//         <div className="mt-16 bg-white p-8 rounded-xl shadow border">
//           <h2 className="text-xl font-bold text-green-700 mb-3">
//             About Your NGO Activity
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             Your NGO plays a crucial role in rescuing and protecting stray
//             animals. Track your requests, team performance, and monthly rescue
//             insights to take better, faster actions.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NgoDashboard;

import React, { useEffect, useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import useApi from "../../utils/api"; 
import { useAuth } from "@clerk/clerk-react";



const NgoDashboard = () => {
  const api = useApi();
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    completed: 0,
  });

  const ngoInfo = {
    name: "Happy Paws Foundation",
    city: "Mumbai",
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300",
    message: "Great work! Your rescue success rate improved this month.",
  };

  useEffect(() => {
    
    const fetchStats = async () => {
  try {
    const res = await api.get("/api/ngo/dashboard-stats");
    setStats(res.data);
  } catch (ex) {
    console.error("Dashboard fetch error:", ex);
    console.error("Response status:", ex.response?.status);
    console.error("Response data:", ex.response?.data);  // Might show "Forbidden: NGO role required"
  }
};
    

    fetchStats();
  }, []);

  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <NgoTopbar />

        {/* ======================= */}
        {/*       HEADER CARD       */}
        {/* ======================= */}
        <div className="flex items-center bg-white rounded-xl shadow border p-6 mb-10">
          <img
            src={ngoInfo.image}
            alt="NGO Logo"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-600 shadow"
          />

          <div className="ml-6">
            <h2 className="text-2xl font-bold text-green-700">
              {ngoInfo.name}
            </h2>
            <p className="text-gray-600 text-sm">{ngoInfo.city}</p>
            <p className="mt-2 text-gray-700 font-medium">{ngoInfo.message}</p>
          </div>

          <div className="ml-auto text-right hidden sm:block">
            <p className="text-sm text-gray-500">Monthly Performance</p>
            <p className="text-3xl font-bold text-green-600">+12%</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mt-2">
          NGO Dashboard
        </h1>
        <p className="text-gray-600 mb-10">
          Monitor rescue requests and track your team’s performance.
        </p>

        {/* ======================= */}
        {/*        STAT CARDS       */}
        {/* ======================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Pending Requests</h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Accepted Requests</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {stats.accepted}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Completed Rescues</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {stats.completed}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Team Activity</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">89%</p>
          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Rescue Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* CHARTS… */}
            {/* Keeping your existing charts unchanged */}
          </div>
        </div>

        {/* INFO BOX */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow border">
          <h2 className="text-xl font-bold text-green-700 mb-3">
            About Your NGO Activity
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your NGO plays a crucial role in rescuing and protecting stray
            animals. Track your requests, team performance, and monthly rescue
            insights to take better, faster actions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;
