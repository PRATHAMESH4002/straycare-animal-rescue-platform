import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    ngoName: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    city: String,
    address: String,
    description: String,

    documentUrl: String, // PDF/image proof

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ngo", ngoSchema);
