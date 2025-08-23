// // src/pages/AdminDashboard.jsx
// import { useEffect, useState } from "react";
// import API from "../services/Api";
// import "./admindashboard.css";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({ users: 0, providers: 0, jobs: 0 });
//   const [pending, setPending] = useState([]);

//   useEffect(() => {
//     API.get("/admin/stats").then((r) => setStats(r.data));
//     API.get("/admin/providers/pending").then((r) => setPending(r.data));
//   }, []);

//   const approve = (id) =>
//     API.patch(`/admin/providers/${id}/approve`).then(() =>
//       setPending((p) => p.filter((u) => u._id !== id))
//     );

//   const reject = (id) =>
//     API.patch(`/admin/providers/${id}/reject`).then(() =>
//       setPending((p) => p.filter((u) => u._id !== id))
//     );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">
//         Admin Dashboard
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
//           <p className="text-gray-500">Users</p>
//           <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
//           <p className="text-gray-500">Providers</p>
//           <p className="text-3xl font-bold text-green-600">{stats.providers}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
//           <p className="text-gray-500">Jobs</p>
//           <p className="text-3xl font-bold text-purple-600">{stats.jobs}</p>
//         </div>
//       </div>

//       {/* Pending Providers */}
//       <h2 className="text-2xl font-semibold mb-5 text-gray-800">
//         Pending Provider Requests
//       </h2>

//       {pending.length === 0 ? (
//         <p className="text-gray-500 italic">No pending requests.</p>
//       ) : (
//         <div className="bg-white shadow-md rounded-xl overflow-hidden">
//           <table className="min-w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left p-4 font-medium text-gray-700">Name</th>
//                 <th className="text-left p-4 font-medium text-gray-700">Email</th>
//                 <th className="text-center p-4 font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pending.map((u) => (
//                 <tr
//                   key={u._id}
//                   className="border-b last:border-none hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4">{u.name}</td>
//                   <td className="p-4">{u.email}</td>
//                   <td className="p-4 flex justify-center gap-3">
//                     <button
//                       onClick={() => approve(u._id)}
//                       className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => reject(u._id)}
//                       className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// File: src/pages/AdminDashboard.jsx
// File: src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // ✅ CSS for gradient theme

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users (replace with your backend endpoint)
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard">
      {/* Title */}
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Add User Button */}
      <button className="add-btn">+ Add New User</button>

      {/* Users List */}
      <div className="experience-list">
        {users.length === 0 ? (
          <p className="empty-text">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="experience-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <button className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
