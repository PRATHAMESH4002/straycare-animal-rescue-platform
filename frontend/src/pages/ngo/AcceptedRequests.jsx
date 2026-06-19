import React, { useEffect, useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import useApi from "../../utils/api.js";
import { toast } from "react-toastify";

const AcceptedRequests = () => {
  const api = useApi();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await api.get("/api/ngo/requests/accepted");
        setRequests(res.data || []);
      } catch (error) {
        console.error("Accepted fetch error:", error);
        toast.error("Failed to load accepted requests ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchAccepted();
  }, []);

  const handleComplete = async (id) => {
    try {
      await api.put(`/api/ngo/requests/${id}/complete`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request marked as completed ✅");
    } catch (error) {
      console.error("Error completing request:", error);
      toast.error("Error completing request ❌");
    }
  };

  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 p-4 min-h-screen">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Accepted Requests
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">No accepted requests yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((r) => {
              // ✅ FIX INVALID http// URLs (old data)
              const fixedImageUrl = r.imageUrl
                ?.replace("http//", "http://")
                ?.replace("https//", "https://");

              return (
                <div
                  key={r._id}
                  className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  {/* Image */}
                  <img
                    src={fixedImageUrl}
                    alt={r.animalType}
                    className="w-full h-48 object-cover rounded-md"
                  />

                  {/* Animal */}
                  <h2 className="text-xl font-bold mt-3">
                    {r.animalType}
                  </h2>

                  {/* Severity */}
                  <p>
                    <strong>Severity:</strong>{" "}
                    <span
                      className={
                        r.severity === "High"
                          ? "text-red-600"
                          : r.severity === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {r.severity}
                    </span>
                  </p>

                  {/* Location */}
                  <p>
                    <strong>Location:</strong>{" "}
                    {r.location?.address || "N/A"}
                  </p>

                  {/* Status */}
                  <p>
                    <strong>Status:</strong> {r.status}
                  </p>

                  {/* Time */}
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(r.updatedAt).toLocaleString()}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                      onClick={() => alert("Status update coming soon")}
                    >
                      Update Status
                    </button>

                    <button
                      onClick={() => handleComplete(r._id)}
                      className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 cursor-pointer"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedRequests;
