import React, { useEffect, useState } from "react";
import NgoSidebar from "../../components/ngo/NgoSidebar";
import NgoTopbar from "../../components/ngo/NgoTopbar";
import useApi from "../../utils/api";
import { toast } from "react-toastify";

const PendingRequests = () => {
  const api = useApi();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await api.get("/api/ngo/requests/pending");
        setRequests(res.data || []);
      } catch (error) {
        console.error("Fetch pending error:", error);
        toast.error("Failed to load pending requests ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.put(`/api/ngo/requests/accept/${id}`);

      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request accepted successfully ✅");
    } catch (error) {
      console.error("Accept failed:", error);
      toast.error("Failed to accept request ❌");
    }
  };

  return (
    <div className="flex">
      <NgoSidebar />

      <div className="flex-1 bg-gray-50 p-4 min-h-screen">
        <NgoTopbar />

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Pending Requests
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((r) => {
              // ✅ DEBUG LOG (SAFE)
              console.log("RAW imageUrl:", r.imageUrl);

              // ✅ FIX INVALID http//
              const fixedImageUrl = r.imageUrl
                ?.replace("http//", "http://")
                ?.replace("https//", "https://");

              return (
                <div
                  key={r._id}
                  className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                >
                  <img
                    src={fixedImageUrl}
                    alt="animal"
                    className="w-full h-48 object-cover rounded-md"
                  />

                  <h2 className="text-xl font-bold mt-3">
                    {r.animalType}
                  </h2>

                  <p>
                    <b>Severity:</b> {r.severity}
                  </p>

                  <p>
                    <b>Location:</b> {r.location?.address || "N/A"}
                  </p>

                  <p>
                    <b>Reporter:</b> {r.reporterEmail}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleAccept(r._id)}
                    className="mt-3 w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 cursor-pointer"
                  >
                    Accept
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
