import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/animal.png";
import { useClerk } from "@clerk/clerk-react";

const NgoTopbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { signOut } = useClerk();

  const confirmLogout = () => {
    signOut(() => (window.location.href = "/"));
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 h-10 rounded-full" />
          <h2 className="text-xl font-bold text-green-700">NGO Panel</h2>
        </div>

        <button className="text-3xl" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-white w-64 h-full shadow-xl z-50
        transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <button
            className="text-2xl float-right"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mt-10">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold text-green-700">NGO Panel</h2>
          </div>

          <nav className="flex flex-col space-y-4 text-gray-700 text-lg mt-6">
            <Link to="/ngo/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link to="/ngo/pending" onClick={() => setOpen(false)}>
              Pending Requests
            </Link>
            <Link to="/ngo/accepted" onClick={() => setOpen(false)}>
              Accepted Requests
            </Link>
            <Link to="/ngo/completed" onClick={() => setOpen(false)}>
              Completed
            </Link>
            <Link to="/ngo/profile" onClick={() => setOpen(false)}>
              Profile
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                setShowLogout(true);
              }}
              className="mt-6 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NgoTopbar;
