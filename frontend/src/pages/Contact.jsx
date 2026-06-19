import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Navbar from "../components/navbar.jsx";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* PAGE TITLE */}
          <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
            Contact Us
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN - CONTACT FORM */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Have questions, feedback, or want to collaborate? We’d love to
                hear from you.
              </p>

              <form className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What’s this about?"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 p-3 rounded-md resize-none focus:ring-2 focus:ring-green-700"
                  ></textarea>
                </div>

                <button className="w-full bg-green-700 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-800 transition">
                  Send Message
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN - INFO & MAP */}
            <div className="flex flex-col space-y-8">
              {/* CONTACT DETAILS CARD */}
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Contact Information
                </h2>

                <div className="space-y-5 text-gray-700">
                  <p className="flex items-center gap-3">
                    <FaPhoneAlt className="text-green-700 text-xl" />
                    <span>
                      <strong>Helpline:</strong> +91 XXXXX XXXXX
                    </span>
                  </p>

                  <p className="flex items-center gap-3">
                    <FaEnvelope className="text-green-700 text-xl" />
                    <span>
                      <strong>Email:</strong> support@straycare.org
                    </span>
                  </p>

                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-green-700 text-xl" />
                    <span>
                      <strong>Address:</strong> StrayCare HQ, Pune, Maharashtra
                    </span>
                  </p>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Follow Us
                  </h3>
                  <div className="flex gap-4 text-2xl text-green-700">
                    <FaFacebook className="cursor-pointer hover:text-green-900 transition" />
                    <FaTwitter className="cursor-pointer hover:text-green-900 transition" />
                    <FaInstagram className="cursor-pointer hover:text-green-900 transition" />
                  </div>
                </div>
              </div>

              {/* MAP EMBED (GOOGLE MAPS) */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <iframe
                  title="map"
                  width="100%"
                  height="300"
                  className="rounded-lg"
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_API_KEY&q=Mumbai,Maharashtra"
                ></iframe>
              </div>
            </div>
          </div>

          {/* NGOS HELPLINE SECTION */}
          <div className="mt-14 bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Emergency NGO Contacts
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Mumbai Animal Rescue
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available 24/7</p>
              </div>

              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Pune Stray Help
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available: 9 AM - 11 PM</p>
              </div>

              <div className="border p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">
                  Nagpur Paw Protectors
                </h3>
                <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                <p className="text-gray-700">Available: 8 AM - 10 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
