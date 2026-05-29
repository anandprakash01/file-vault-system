import mongoose from "mongoose";

const auditLogSchema = mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["UPLOAD", "DOWNLOAD", "DELETE", "VIEW"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
  },
  {timestamps: true},
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
