import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/animal.png";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(false); // close the mobile menu
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // Support redirect after login
  const redirectTo =
    new URLSearchParams(window.location.search).get("redirect") || "/";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* ---------------- LEFT SIDEBAR (Desktop) ---------------- */}
      <div className="hidden md:flex flex-col justify-between bg-green-700 w-1/3 p-10 text-white">
        <div>
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} className="w-12 h-12 rounded-full bg-white p-1" />
            <h1 className="text-3xl font-bold">StrayCare</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-gray-100">
            Login to report incidents, track rescues, and help animals in need.
          </p>

          {/* HOME BUTTON */}
          <Link
            to="/"
            className="inline-block mt-6 bg-white text-green-700 font-semibold px-5 py-2 rounded-md hover:bg-green-300 transition"
          >
            ← Go to Home
          </Link>
        </div>

        <p className="text-sm text-gray-200">© 2025 StrayCare</p>
      </div>

      {/* ---------------- RIGHT CONTENT ---------------- */}
      <div className="flex-1 flex flex-col">

        {/* -------- Mobile Navbar (Only on small screens) -------- */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-bold text-green-700">StrayCare</h2>
          </div>

          {/* HOME BUTTON (Mobile) */}
          <Link
            to="/"
            className="text-green-700 font-semibold border border-green-700 px-3 py-1 rounded-md hover:bg-green-700 hover:text-white transition"
          >
            Home
          </Link>
        </div>

        {/* -------- Login Form (Centered) -------- */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">

            <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
              Login to StrayCare
            </h1>

            <SignIn
              appearance={{
                elements: {
                  card: "shadow-none w-full",
                  rootBox: "w-full",
                  formFieldInput: "rounded-md border-gray-300",
                  formButtonPrimary:
                    "bg-green-700 hover:bg-green-800 w-full text-white",
                },
              }}
              path="/login"
              routing="path"
              signUpUrl="/register"
              redirectUrl={redirectTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
