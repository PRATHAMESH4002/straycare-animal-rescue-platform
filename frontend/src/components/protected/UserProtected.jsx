import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const UserProtected = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>

      <SignedOut>
        <Navigate to={`/login?redirect=${location.pathname}`} replace />
      </SignedOut>
    </>
  );
};

export default UserProtected;
