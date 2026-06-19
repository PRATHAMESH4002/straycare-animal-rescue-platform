import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reporterId: { type: String, required: true }, // Clerk user id (or frontend provided id)
    reporterName: { type: String },
    reporterEmail: { type: String },

    animalType: { type: String, required: true },
    description: { type: String },
    severity: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },

    imageUrl: { type: String }, // local path or cloud URL
    location: {
      address: String,
      lat: Number,
      lng: Number,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },
    assignedNgo: {
      type: String, // Clerk NGO user id
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
