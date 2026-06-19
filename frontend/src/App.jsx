import { BrowserRouter, Routes, Route } from "react-router-dom";

// USER PAGES
import LandingPage from "./pages/LandingPage";
import ReportIncident from "./pages/ReportIncident";
import MyReports from "./pages/MyReports";
import NGOs from "./pages/NGOs";
import Contact from "./pages/Contact";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

// NGO PAGES
import NgoDashboard from "./pages/ngo/NgoDashboard";
import PendingRequests from "./pages/ngo/PendingRequests";
import AcceptedRequests from "./pages/ngo/AcceptedRequests";
import CompletedRequests from "./pages/ngo/CompletedRequests";
import NgoProfile from "./pages/ngo/NgoProfile";

// APPLY NGO
import ApplyNgo from "./pages/apply/ApplyNgo";
import NgoPendingApproval from "./pages/apply/NgoPendingApproval";

// PROTECTED ROUTES
import NgoProtected from "./components/protected/NgoProtected";
import AdminProtected from "./components/protected/AdminProtected";
import UserProtected from "./components/protected/UserProtected";

// ROLE REDIRECT
import { SignedIn } from "@clerk/clerk-react";
import RoleRedirect from "./components/protected/RoleRedirect";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingNgos from "./pages/admin/PendingNgos";
import ApprovedNgos from "./pages/admin/ApprovedNgos";
import RescueRequestsAdmin from "./pages/admin/RescueRequestsAdmin";

function App() {
  return (
    <BrowserRouter>
      <SignedIn>
        <RoleRedirect />
      </SignedIn>

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/ReportIncident"
          element={
            <UserProtected>
              <ReportIncident />
            </UserProtected>
          }
        />

        <Route
          path="/my-reports"
          element={
            <UserProtected>
              <MyReports />
            </UserProtected>
          }
        />

        <Route path="/ngos" element={<NGOs />} />
        <Route path="/contact" element={<Contact />} />

        {/* AUTH */}
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />

        {/* APPLY NGO */}
        <Route path="/apply-ngo" element={<ApplyNgo />} />
        <Route
          path="/ngo/pending-approval"
          element={<NgoPendingApproval />}
        />

        {/* NGO ROUTES */}
        <Route
          path="/ngo/dashboard"
          element={
            <NgoProtected>
              <NgoDashboard />
            </NgoProtected>
          }
        />

        <Route
          path="/ngo/pending"
          element={
            <NgoProtected>
              <PendingRequests />
            </NgoProtected>
          }
        />

        <Route
          path="/ngo/accepted"
          element={
            <NgoProtected>
              <AcceptedRequests />
            </NgoProtected>
          }
        />

        <Route
          path="/ngo/completed"
          element={
            <NgoProtected>
              <CompletedRequests />
            </NgoProtected>
          }
        />

        <Route
          path="/ngo/profile"
          element={
            <NgoProtected>
              <NgoProfile />
            </NgoProtected>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/ngos"
          element={
            <AdminProtected>
              <PendingNgos />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/approved-ngos"
          element={
            <AdminProtected>
              <ApprovedNgos />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/rescue-requests"
          element={
            <AdminProtected>
              <RescueRequestsAdmin />
            </AdminProtected>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;