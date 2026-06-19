import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import useApi from "../../utils/api";
import { toast } from "react-toastify";

const PendingNgos = () => {
  const api = useApi();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch pending NGOs
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get("/api/admin/pending-ngos");
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching pending NGOs:", err);
        toast.error("Failed to load NGO applications");
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  // Approve NGO
  const approveNgo = async (id) => {
    try {
      await api.post(`/api/admin/approve-ngo/${id}`);

      setApplications((prev) =>
        prev.filter((ngo) => ngo._id !== id)
      );

      toast.success("NGO approved successfully ✅");
    } catch (err) {
      console.error("Approve NGO Error:", err);
      toast.error("Approval failed ❌");
    }
  };

  // Reject NGO
  const rejectNgo = async (id) => {
    try {
      await api.post(`/api/admin/reject-ngo/${id}`);

      setApplications((prev) =>
        prev.filter((ngo) => ngo._id !== id)
      );

      toast.success("NGO rejected successfully ❌");
    } catch (err) {
      console.error("Reject NGO Error:", err);
      toast.error("Rejection failed ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">
        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-6">
          Pending NGO Applications
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading NGO applications...
          </p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No pending NGO applications.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {applications.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {ngo.ngoName}
                </h2>

                <p>
                  <strong>Email:</strong>{" "}
                  {ngo.email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {ngo.phone || "N/A"}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {ngo.city || "N/A"}
                </p>

                <p className="mt-2">
                  <strong>Address:</strong>{" "}
                  {ngo.address || "N/A"}
                </p>

                <p className="mt-2">
                  <strong>Description:</strong>{" "}
                  {ngo.description || "N/A"}
                </p>

                {ngo.documentUrl && (
                  <div className="mt-3">
                    <a
                      href={`http://localhost:5000${ngo.documentUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Certificate / Document
                    </a>
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      approveNgo(ngo._id)
                    }
                    className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectNgo(ngo._id)
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Reject
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

export default PendingNgos;