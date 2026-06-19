import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useUser } from "@clerk/clerk-react";
import useApi from "../utils/api";

const NGOs = () => {
  const { isSignedIn } = useUser();
  const api = useApi();

  const [search, setSearch] = useState("");
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await api.get("/api/ngos");

        console.log("NGOs Data:", res.data);

        if (Array.isArray(res.data)) {
          setNgos(res.data);
        } else if (res.data.approved) {
          setNgos(res.data.approved);
        } else {
          setNgos([]);
        }
      } catch (err) {
        console.error("Fetch NGOs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  const filteredNgos = ngos.filter(
    (ngo) =>
      ngo.name?.toLowerCase().includes(search.toLowerCase()) ||
      ngo.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-50 border-b-2 border-green-200 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Become a Partner NGO
          </h1>

          <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-8">
            Join hands with StrayCare to rescue, treat and protect stray
            animals.
          </p>

          <Link
            to={isSignedIn ? "/apply-ngo" : "/login?redirect=/apply-ngo"}
            className="bg-green-700 text-white px-10 py-4 rounded-lg text-lg shadow hover:bg-green-800 transition"
          >
            Apply as NGO
          </Link>

          <p className="text-gray-500 text-sm mt-4">
            Approval takes 24–48 hours by our verification team.
          </p>
        </div>
      </section>

      {/* NGO LIST */}
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
            Our Partner NGOs
          </h2>

          <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
            Trusted NGOs actively rescuing and treating animals.
          </p>

          {/* Search */}
          <div className="flex items-center max-w-lg mx-auto bg-white shadow p-3 rounded-lg mb-8 border">
            <FaSearch className="text-gray-500 text-xl mr-3" />

            <input
              type="text"
              placeholder="Search NGO by name or city..."
              className="w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-600">Loading NGOs...</p>
          )}

          {/* NGO Cards */}
          {!loading && filteredNgos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNgos.map((ngo) => (
                <div
                  key={ngo._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border"
                >
                  {/* NGO Image */}
                  {ngo.documentUrl && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${ngo.documentUrl}`}
                      alt={ngo.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  {/* NGO Name */}
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    {ngo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {ngo.description ||
                      "Partner NGO working for rescue and welfare of stray animals."}
                  </p>

                  {/* City */}
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    {ngo.city || "Unknown City"}
                  </p>

                  {/* Rating */}
                  <p className="flex items-center gap-2 mt-2 text-yellow-600 font-semibold">
                    <FaStar />
                    {ngo.rating || 0} / 5.0
                  </p>

                  <div className="my-4 border-t"></div>

                  {/* Contact */}
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <FaPhoneAlt className="text-green-700" />
                      {ngo.phone || "N/A"}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaEnvelope className="text-green-700" />
                      {ngo.email || "N/A"}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href={ngo.phone ? `tel:${ngo.phone}` : "#"}
                      className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition text-center"
                    >
                      Call Now
                    </a>

                    <a
                      href={ngo.email ? `mailto:${ngo.email}` : "#"}
                      className="flex-1 border border-green-700 text-green-700 py-2 rounded-md hover:bg-green-700 hover:text-white transition text-center"
                    >
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredNgos.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No NGOs found for "{search}".
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NGOs;