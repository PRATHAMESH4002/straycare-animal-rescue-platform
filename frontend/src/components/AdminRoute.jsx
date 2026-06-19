import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    "prathameshdabhole06@gmail.com";

  return isAdmin
    ? children
    : <Navigate to="/" />;
};

export default AdminRoute;