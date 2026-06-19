import React, { useEffect, useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import useApi from "../../utils/api";

const CompletedRequests = () => {
  const api = useApi();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await api.get("/api/ngo/requests/completed");
        setRequests(res.data || []);
      } catch (error) {
        console.error("Error fetching completed requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen p-4">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Completed Rescues
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">No completed rescues yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((r) => {
              // ✅ FIX INVALID OLD IMAGE URLs
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

                  {/* Treatment */}
                  <p>
                    <strong>Treatment:</strong>{" "}
                    {r.treatment || "No treatment info"}
                  </p>

                  {/* Completed By */}
                  <p>
                    <strong>Completed By:</strong>{" "}
                    {r.completedBy || "Unknown"}
                  </p>

                  {/* Time */}
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(r.updatedAt).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedRequests;
