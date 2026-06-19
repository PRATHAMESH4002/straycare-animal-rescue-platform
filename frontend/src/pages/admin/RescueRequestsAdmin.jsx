import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import useApi from "../../utils/api";
import { toast } from "react-toastify";

const RescueRequestsAdmin = () => {
  const api = useApi();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await api.get("/api/admin/rescue-requests");
        console.log("Rescue Requests:", res.data);
        setRequests(res.data);
      } catch (err) {
        console.error("Error loading rescue requests:", err);
        toast.error("Failed to load rescue requests");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [api]);

  const verifyRequest = async (id) => {
    try {
      console.log("Verify Request:", id);

      // Add API call here if needed
      // await api.put(`/api/admin/rescue-requests/${id}/verify`);

      toast.success("Request verified successfully");
    } catch (err) {
      console.error(err);
      toast.error("Verification failed");
    }
  };

  const rejectRequest = async (id) => {
    if (!window.confirm("Reject this rescue request?")) return;

    try {
      // Add API call here if needed
      // await api.delete(`/api/admin/rescue-requests/${id}`);

      setRequests((prev) =>
        prev.filter((req) => req._id !== id)
      );

      toast.success("Request rejected");
    } catch (err) {
      console.error(err);
      toast.error("Reject failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <AdminSidebar />
      </div>

      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      <div className="flex-1 md:ml-64 p-4 sm:p-6">
        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-8">
          Rescue Requests
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading rescue requests...
          </p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No rescue requests found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow border hover:shadow-lg transition p-5"
              >
                <img
                  src={req.imageUrl}
                  alt={req.animalType}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />

                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {req.animalType} Rescue Request
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  Reported:{" "}
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.severity === "High"
                        ? "bg-red-500"
                        : req.severity === "Medium"
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.severity}
                  </span>
                </p>

                <p className="mt-2">
                  <strong>Description:</strong>{" "}
                  {req.description}
                </p>

                <p className="mt-2">
                  <strong>Location:</strong>{" "}
                  {req.location?.address || "Not Available"}
                </p>

                <p className="mt-2">
                  <strong>Reporter:</strong>{" "}
                  {req.reporterName}
                </p>

                <p className="mt-2 break-all">
                  <strong>Contact:</strong>{" "}
                  {req.reporterEmail}
                </p>

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-green-700">
                    {req.status}
                  </span>
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => verifyRequest(req._id)}
                    className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                  >
                    Verify
                  </button>

                  <button
                    onClick={() => rejectRequest(req._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
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

export default RescueRequestsAdmin;