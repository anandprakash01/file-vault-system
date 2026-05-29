import mongoose from "mongoose";

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  {
    timestamps: true,
  },
);

const Organization = mongoose.model("Organization", orgSchema);

export default Organization;
