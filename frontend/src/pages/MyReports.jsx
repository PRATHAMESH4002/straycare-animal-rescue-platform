import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useApi from "../utils/api";

const MyReports = () => {
  const api = useApi();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColor = {
    Pending: "bg-yellow-500",
    Accepted: "bg-blue-500",
    Completed: "bg-green-600",
  };

  // ✅ Fix old/broken image URLs
  const getImageUrl = (url) => {
    if (!url) return null;
    return url
      .replace("http//", "http://")
      .replace("https//", "https://");
  };

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const res = await api.get("/api/reports/me");
        setReports(res.data.data || []);
      } catch (err) {
        console.error("Fetch my reports error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            My Reports
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-600">
              You haven’t submitted any reports yet.
            </p>
          ) : (
            <>
              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="p-3 border">Report</th>
                      <th className="p-3 border">Animal</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Severity</th>
                      <th className="p-3 border">Location</th>
                      <th className="p-3 border">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((r) => (
                      <tr key={r._id} className="text-center">
                        {/* Report ID + Image */}
                        <td className="p-3 border">
                          <div className="flex items-center gap-3 justify-center">
                            {r.imageUrl && (
                              <img
                                src={getImageUrl(r.imageUrl)}
                                alt="report"
                                className="w-12 h-12 object-cover rounded-md border cursor-pointer"
                                onClick={() =>
                                  window.open(getImageUrl(r.imageUrl), "_blank")
                                }
                              />
                            )}
                            <span className="text-xs break-all">
                              {r._id}
                            </span>
                          </div>
                        </td>

                        <td className="p-3 border">{r.animalType}</td>

                        <td className="p-3 border">
                          <span
                            className={`px-3 py-1 rounded-md text-white text-sm ${statusColor[r.status]}`}
                          >
                            {r.status}
                          </span>
                        </td>

                        <td className="p-3 border">{r.severity}</td>

                        <td className="p-3 border">
                          {r.location?.address || "N/A"}
                        </td>

                        <td className="p-3 border">
                          {new Date(r.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE VIEW ================= */}
              <div className="md:hidden space-y-6">
                {reports.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white border rounded-lg p-4 shadow"
                  >
                    {/* Image + Report ID */}
                    <div className="flex items-center gap-3 mb-3">
                      {r.imageUrl && (
                        <img
                          src={getImageUrl(r.imageUrl)}
                          alt="report"
                          className="w-16 h-16 object-cover rounded-md border cursor-pointer"
                          onClick={() =>
                            window.open(getImageUrl(r.imageUrl), "_blank")
                          }
                        />
                      )}
                      <p className="text-sm break-all">
                        <b>Report ID:</b> {r._id}
                      </p>
                    </div>

                    <p>
                      <b>Animal:</b> {r.animalType}
                    </p>

                    <p>
                      <b>Status:</b>{" "}
                      <span
                        className={`px-2 py-1 rounded text-white ${statusColor[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </p>

                    <p>
                      <b>Severity:</b> {r.severity}
                    </p>

                    <p>
                      <b>Location:</b> {r.location?.address || "N/A"}
                    </p>

                    <p>
                      <b>Time:</b>{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReports;
