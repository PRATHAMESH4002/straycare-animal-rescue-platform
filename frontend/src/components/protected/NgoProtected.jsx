import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const NgoProtected = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  const role = user.publicMetadata.role;

  if (role !== "ngo") {
    // If NGO applied but not approved
    if (role === "ngo_pending") {
      return <Navigate to="/ngo/pending-approval" />;
    }

    return <Navigate to="/" />; // normal users redirected home
  }

  return children;
};

export default NgoProtected;
