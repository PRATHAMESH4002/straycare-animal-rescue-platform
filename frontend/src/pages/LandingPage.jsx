import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw, FaMapMarkerAlt, FaCamera, FaArrowRight } from "react-icons/fa";
import heroImg from "../assets/image1.png";
import AboutImg from "../assets/newHero.png";
import Navbar from "../components/navbar.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate() ;
  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center
  "
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        {/* Mobile Responsive Background Fix */}
        <div className="absolute inset-0 bg-black/30 md:bg-transparent"></div>

        <div className="relative w-full py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white md:text-green-800 leading-tight drop-shadow-lg">
              Report Injured <br /> Stray Animals Instantly
            </h2>

            <p className="text-base md:text-lg text-white md:text-gray-700 mt-4 max-w-2xl drop-shadow">
              Connect with local NGOs and help save the lives of stray animals
              in your city by reporting incidents instantly.
            </p>

            <div className="mt-8 flex space-x-4">
              <Link
                to="/ReportIncident"
                className="bg-green-700 text-white px-6 py-3 rounded-md text-lg hover:bg-green-800 transition inline-flex items-center gap-2"
              >
                Report Now <FaArrowRight />
              </Link>

              <a
                href="#about"
                className="border border-white md:border-green-700 px-6 py-3 rounded-md text-lg 
          text-white md:text-green-700 hover:bg-green-700 hover:text-white transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div onClick={() => navigate('/ReportIncident')} className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition text-center">
              <FaCamera className="text-green-700 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">
                Report Incident
              </h4>
              <p className="text-gray-600 mt-2">
                Capture a clear picture of the injured animal.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition text-center">
              <FaMapMarkerAlt className="text-green-700 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">
                Send Location
              </h4>
              <p className="text-gray-600 mt-2">
                Automatically detect your GPS location or enter it manually.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-lg shadow hover:shadow-lg transition text-center">
              <FaPaw className="text-green-700 text-5xl mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">
                NGO Arrives
              </h4>
              <p className="text-gray-600 mt-2">
                Nearby NGOs receive your report and respond immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <img src={AboutImg} alt="About" className="w-full drop-shadow-xl" />
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            About StrayCare
          </h3>
          <p className="text-gray-600 leading-relaxed">
            StrayCare is a platform designed to bridge the gap between
            compassionate citizens and animal rescue NGOs. We simplify the
            process of reporting injured stray animals and ensure immediate
            action.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Real-time Incident Reporting</li>
            <li>✔ Verified NGO Network</li>
            <li>✔ Live Rescue Updates</li>
            <li>✔ User-Friendly Dashboard</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
    <footer className="bg-green-900 text-white py-8 mt-10">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
    <div>
      <p>© 2025 StrayCare. All rights reserved.</p>
      <p className="text-sm text-green-200 mt-1">
        Designed & Developed by Prathamesh Dabhole
      </p>
    </div>

    <div className="space-x-6">
      <Link to="/">Privacy Policy</Link>
      <Link to="/">Terms</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
