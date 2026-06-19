import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import logo from "../assets/animal.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    "prathameshdabhole06@gmail.com";

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="StrayCare Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-2xl font-bold text-green-700">
              StrayCare
            </h1>
          </Link>

          <nav className="space-x-8 text-gray-700 font-medium hidden md:flex">
            <Link to="/">Home</Link>
            <Link to="/ReportIncident">Report</Link>
            <Link to="/my-reports">My Reports</Link>
            <Link to="/ngos">NGOs</Link>
            <Link to="/contact">Contact</Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-red-600 font-semibold"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <Link
                to="/login"
                className="border border-green-700 text-green-700 px-4 py-2 rounded-md hover:bg-green-700 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
              >
                Register
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>

          <button
            className="md:hidden text-3xl text-green-700"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <button
            className="text-2xl text-gray-600 float-right"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <div className="mt-10 flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-2xl font-bold text-green-700">
              StrayCare
            </h2>
          </div>

          <nav className="flex flex-col space-y-5 text-lg mt-6 text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link
              to="/ReportIncident"
              onClick={() => setIsOpen(false)}
            >
              Report
            </Link>

            <Link
              to="/my-reports"
              onClick={() => setIsOpen(false)}
            >
              My Reports
            </Link>

            <Link
              to="/ngos"
              onClick={() => setIsOpen(false)}
            >
              NGOs
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-red-600 font-semibold"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-8">
            <SignedOut>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center border border-green-700 text-green-700 py-2 rounded-md"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-green-700 text-white py-2 rounded-md mt-3"
              >
                Register
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="mt-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;