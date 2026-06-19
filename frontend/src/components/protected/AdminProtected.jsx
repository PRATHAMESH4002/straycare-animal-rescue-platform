import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  const role = user.publicMetadata.role;

  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminProtected;
