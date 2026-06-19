import mongoose from "mongoose";

const rescueSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },

    userId: {
      type: String, // Clerk User ID
      required: true,
    },

    ngoId: {
      type: String, // Clerk ID of assigned NGO
      required: false,
    },

    status: {
      type: String,
      enum: [
        "pending",         // Waiting for NGO
        "accepted",        // NGO accepted
        "on_the_way",      // NGO heading
        "rescuing",        // Animal rescue in progress
        "treatment",       // Treatment ongoing
        "completed",       // Final status
      ],
      default: "pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RescueRequest", rescueSchema);
