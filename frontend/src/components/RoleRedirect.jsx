import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const role = user.publicMetadata.role;

    if (role === "admin") navigate("/admin");
    else if (role === "ngo") navigate("/ngo/dashboard");
    else if (role === "ngo_pending") navigate("/ngo/pending-approval");
    else navigate("/"); // normal user home
  }, [user]);

  return null;
};

export default RoleRedirect;
