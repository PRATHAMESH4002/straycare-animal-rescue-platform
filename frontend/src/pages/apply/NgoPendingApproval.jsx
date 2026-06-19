import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/animal.png";

const NgoPendingApproval = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <img
        src={logo}
        alt="StrayCare Logo"
        className="w-20 h-20 rounded-full mb-4"
      />

      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Application Under Review
      </h1>

      <p className="text-gray-600 text-center max-w-lg mb-6">
        Thank you for applying to join StrayCare as a partner NGO. Our admin
        team is currently reviewing your application. You will be notified once
        it is approved.
      </p>

      <Link
        to="/"
        className="bg-green-700 text-white px-6 py-3 rounded-md text-lg hover:bg-green-800 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NgoPendingApproval;
