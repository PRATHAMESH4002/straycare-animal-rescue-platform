import React from "react";
import { SignUp } from "@clerk/clerk-react";
import logo from "../assets/animal.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* ---------- LEFT SIDEBAR (DESKTOP) ---------- */}
      <div className="hidden md:flex flex-col justify-between bg-green-700 w-1/3 p-10 text-white">
        <div>
          {/* Logo + Title */}
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-12 h-12 rounded-full bg-white p-1" />
            <h1 className="text-3xl font-bold">StrayCare</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Join StrayCare</h2>
          <p className="text-gray-100">
            Create your account and help us rescue animals faster.
          </p>

          {/* GO HOME BUTTON */}
          <div className="mt-6">
            <Link
              to="/"
              className="inline-block bg-white text-green-700 px-5 py-2 rounded-md 
                         hover:bg-green-200 transition"
            >
              ← Go to Home
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-200">
          © 2025 StrayCare. All Rights Reserved.
        </p>
      </div>

      {/* ---------- RIGHT SIDE CONTENT ---------- */}
      <div className="flex-1 flex flex-col">
        {/* ---------- MOBILE NAVBAR ---------- */}
        <div className="md:hidden flex justify-between items-center p-4 shadow bg-white">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-bold text-green-700">StrayCare</h2>
          </div>

          <Link
            to="/"
            className="text-green-700 font-semibold border border-green-700 px-3 py-1 rounded-md hover:bg-green-700 hover:text-white transition"
          >
            Home
          </Link>
        </div>

        {/* ---------- SIGNUP BOX (CENTER) ---------- */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
              Create Your Account
            </h1>

            <SignUp
              appearance={{
                elements: {
                  card: "shadow-none",
                  formButtonPrimary:
                    "bg-green-700 hover:bg-green-800 text-white",
                },
              }}
              path="/register"
              routing="path"
              signInUrl="/login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
