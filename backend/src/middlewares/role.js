import { clerkClient } from "@clerk/clerk-sdk-node";
import Ngo from "../models/Ngo.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export const requireAdmin = [
  ClerkExpressRequireAuth(),
  (req, res, next) => {
    const role = req.auth?.sessionClaims?.publicMetadata?.role;

    console.log("ADMIN ROLE:", role); // 🔍 debug

    if (role !== "admin") {
      return res.status(401).json({ message: "Admin access required" });
    }

    next();
  },
];


// import Ngo from "../models/Ngo.js";

export const requireNgo = async (req, res, next) => {
  // 🔍 ADD THIS LINE
  console.log("Clerk User ID:", req.auth.userId);

  const clerkUserId = req.auth.userId;

  const ngo = await Ngo.findOne({ clerkUserId });

  if (!ngo || !ngo.approved) {
  return res.status(403).json({
    message: "Access denied: NGO not approved or not found"
  });
}


  req.ngo = ngo;
  next();
};




