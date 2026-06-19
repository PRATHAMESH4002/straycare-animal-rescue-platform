import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import  useApi  from "../../utils/api";

const ApprovedNgos = () => {
  const api = useApi(); 
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch approved NGOs
  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await api.get("/api/admin/approved-ngos");
        setNgos(res.data);
      } catch (err) {
        console.error("Error fetching approved NGOs:", err);
      }
      setLoading(false);
    };

    fetchApproved();
  }, []);

  const removeNgo = async (id) => {
    if (!window.confirm("Are you sure you want to remove this NGO?")) return;

    try {
      await api.delete(`/admin/remove-ngo/${id}`);
      setNgos((prev) => prev.filter((ngo) => ngo._id !== id));
      alert("NGO removed successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to remove NGO.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* -------- Mobile Blur Overlay -------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* -------- Mobile Sidebar -------- */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      {/* -------- Desktop Sidebar -------- */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* -------- Main Page Content -------- */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">

        {/* Topbar */}
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-8">
          Approved NGOs
        </h1>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : ngos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No approved NGOs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {ngo.ngoName}
                </h2>

                <p><strong>Email:</strong> {ngo.email}</p>
                <p><strong>Phone:</strong> {ngo.phone}</p>
                <p><strong>City:</strong> {ngo.city}</p>

                <p className="my-2 text-gray-700">
                  <strong>About:</strong> {ngo.description}
                </p>

                <p className="text-sm text-gray-500 mb-2">
                  Approved on: {new Date(ngo.createdAt).toLocaleDateString()}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => alert("Full details page coming soon!")}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => removeNgo(ngo._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedNgos;
