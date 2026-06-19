import React, { useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import { useUser } from "@clerk/clerk-react";
import {
  FaEnvelope,
  FaPhone,
  FaCity,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const NgoProfile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const [ngoData, setNgoData] = useState({
    name: user?.fullName || "NGO Name",
    email: user?.primaryEmailAddress?.emailAddress,
    phone: "9876543210",
    city: "Mumbai",
    image:
      user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/194/194938.png",
  });

  const handleChange = (e) => {
    setNgoData({ ...ngoData, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully! ✅");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <NgoSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-6">
        <NgoTopbar />

        {/* Header Card */}
        <div
          className="bg-white rounded-xl shadow border p-6 
          flex flex-col md:flex-row md:items-center gap-6 mb-10"
        >
          <img
            src={ngoData.image}
            alt="NGO Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-600 shadow mx-auto md:mx-0"
          />

          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-green-700">
              {ngoData.name}
            </h1>
            <p className="text-gray-600">{ngoData.email}</p>
            <p className="text-sm text-gray-500 mt-1">NGO Profile Overview</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-green-700 text-white px-5 py-2 rounded-md 
            hover:bg-green-800 transition flex items-center gap-2 mx-auto md:mx-0 cursor-pointer"
          >
            <FaEdit />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow border max-w-3xl mx-auto">
          {/* VIEW MODE */}
          {!isEditing ? (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center md:text-left">
                Profile Details
              </h2>

              <div className="space-y-6">
                {/* NGO Name */}
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">NGO Name</p>
                    <p className="text-lg font-semibold break-words">
                      {ngoData.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-blue-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-lg font-semibold break-words">
                      {ngoData.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <FaPhone className="text-green-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="text-lg font-semibold">{ngoData.phone}</p>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-start gap-4">
                  <FaCity className="text-purple-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">City</p>
                    <p className="text-lg font-semibold">{ngoData.city}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* EDIT MODE */
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center md:text-left">
                Edit Profile
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="font-semibold">NGO Name</label>
                  <input
                    name="name"
                    value={ngoData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1
                    focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="font-semibold">Phone</label>
                  <input
                    name="phone"
                    value={ngoData.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1 
                    focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="font-semibold">City</label>
                  <input
                    name="city"
                    value={ngoData.city}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1
                    focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>

                {/* Save */}
                <button
                  onClick={saveChanges}
                  className="w-full bg-green-700 text-white py-3 rounded-md 
                  text-lg font-semibold hover:bg-green-800 transition"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NgoProfile;
