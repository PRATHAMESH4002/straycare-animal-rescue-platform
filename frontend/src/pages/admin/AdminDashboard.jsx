import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { Link } from "react-router-dom";
import useApi from "../../utils/api";

const AdminDashboard = () => {
  const api = useApi();

  const [stats, setStats] = useState({
    totalNgos: 0,
    pendingNgos: 0,
    activeRequests: 0,
    platformHealth: "0%",
  });

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingNgos, setPendingNgos] = useState([]);

  // --------------------- Fetch Dashboard Stats ---------------------
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await api.get("/api/admin/stats");
        setStats(statsRes.data);

        const pendingRes = await api.get("/api/admin/pending-ngos");
        setPendingNgos(pendingRes.data);
      } catch (err) {
        console.log("Admin dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

      {/* -------- Main Content -------- */}
      <div className="flex-1 md:ml-64 p-4 sm:p-6">
        {/* Topbar */}
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />

        <h1 className="text-3xl font-bold text-green-700 mt-6">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">
          Manage NGOs, rescue requests, and platform performance.
        </p>

        {loading ? (
          <p className="text-center text-gray-600">Loading dashboard...</p>
        ) : (
          <>
            {/* ---------------- STAT CARDS ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Total NGOs */}
              <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
                <h3 className="text-gray-500 text-sm">Total NGOs</h3>
                <p className="text-4xl font-bold text-green-700 mt-2">
                  {stats.totalNgos}
                </p>
                <p className="text-green-600 text-sm mt-1">Approved NGOs</p>
              </div>

              {/* Pending NGOs */}
              <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
                <h3 className="text-gray-500 text-sm">
                  Pending NGO Applications
                </h3>
                <p className="text-4xl font-bold text-orange-500 mt-2">
                  {pendingNgos.length}
                </p>

                <Link
                  to="/admin/ngos"
                  className="text-green-700 text-sm mt-2 block"
                >
                  Review applications →
                </Link>
              </div>

              {/* Active Rescue Requests */}
              <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
                <h3 className="text-gray-500 text-sm">
                  Active Rescue Requests
                </h3>
                <p className="text-4xl font-bold text-red-500 mt-2">
                  {stats.activeRequests}
                </p>
                <Link
                  to="/admin/rescue-requests"
                  className="text-green-700 text-sm mt-2 block"
                >
                  Manage requests →
                </Link>
              </div>

              {/* Platform Health */}
              <div className="bg-white rounded-xl p-6 shadow border hover:shadow-lg transition">
                <h3 className="text-gray-500 text-sm">Platform Health</h3>
                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {stats.platformHealth}
                </p>
                <p className="text-gray-500 text-sm mt-1">System stable</p>
              </div>
            </div>

            {/* ---------------- ANALYTICS ---------------- */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Analytics Overview
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Chart 1 */}
                <div className="bg-white rounded-xl shadow border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Rescue Requests – Last 6 Months
                  </h3>

                  <div className="relative h-40 flex items-end gap-4">
                    {[20, 35, 25, 40, 30, 45].map((value, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="bg-green-600 rounded-t"
                          style={{ height: `${value * 2}px` }}
                        ></div>
                        <p className="text-xs text-center mt-1 text-gray-500">
                          {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][i]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2 */}
                <div className="bg-white rounded-xl shadow border p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    NGO Growth (Yearly)
                  </h3>

                  <div className="relative h-40 flex items-end gap-4">
                    {[10, 15, 22, 32, 40].map((value, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="bg-blue-500 rounded-t"
                          style={{ height: `${value * 2}px` }}
                        ></div>
                        <p className="text-xs text-center mt-1 text-gray-500">
                          {2020 + i}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- SYSTEM OVERVIEW ---------------- */}
            <div className="mt-16 bg-white p-8 rounded-xl shadow border">
              <h2 className="text-xl font-bold text-green-700 mb-3">
                System Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As an administrator, you verify NGOs, manage rescue requests,
                and monitor the stability of the stray animal rescue platform.
                This dashboard gives you insights into performance, load, and
                partner NGO activity.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
