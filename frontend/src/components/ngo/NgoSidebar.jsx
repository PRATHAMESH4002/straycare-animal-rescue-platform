import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/animal.png";
import { useClerk } from "@clerk/clerk-react";

const NgoSidebar = () => {
  const path = useLocation().pathname;
  const { signOut } = useClerk();
  const [showLogout, setShowLogout] = useState(false);

  const active = (route) =>
    path.includes(route) ? "text-green-700 font-semibold" : "";

  const confirmLogout = () => {
    signOut(() => (window.location.href = "/"));
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r min-h-screen p-6 hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <h2 className="text-2xl font-bold text-green-700">NGO Panel</h2>
          </div>

          <nav className="flex flex-col space-y-6 text-gray-700 text-lg">
            <Link to="/ngo/dashboard" className={active("dashboard")}>
              Dashboard
            </Link>
            <Link to="/ngo/pending" className={active("pending")}>
              Pending Requests
            </Link>
            <Link to="/ngo/accepted" className={active("accepted")}>
              Accepted Requests
            </Link>
            <Link to="/ngo/completed" className={active("completed")}>
              Completed Rescues
            </Link>
            <Link to="/ngo/profile" className={active("profile")}>
              Profile
            </Link>
          </nav>
          {/* LOGOUT BUTTON */}
          <button
            onClick={() => setShowLogout(true)}
            className=" text-red-600  mt-6 hover:text-red-700 transition text-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 cursor-pointer">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
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

export default NgoSidebar;
