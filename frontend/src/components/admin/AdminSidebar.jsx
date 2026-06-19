import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaList, FaCheckCircle } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Admin Panel</h1>

      <nav className="space-y-4 text-gray-700 font-medium">
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:text-green-700"
        >
          <FaHome /> Dashboard
        </Link>

        <Link
          to="/admin/ngos"
          className="flex items-center gap-3 hover:text-green-700"
        >
          <FaUsers /> Pending NGOs
        </Link>

        <Link
          to="/admin/approved-ngos"
          className="flex items-center gap-3 hover:text-green-700"
        >
          <FaCheckCircle /> Approved NGOs
        </Link>

        <Link
          to="/admin/rescue-requests"
          className="flex items-center gap-3 hover:text-green-700"
        >
          <FaList /> Rescue Requests
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
