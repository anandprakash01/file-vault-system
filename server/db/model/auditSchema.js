const mongoose = require("mongoose");

const auditSchema = mongoose.Schema(
    {
        action: {
            type: String, // "uploaded" or // "downloaded"
            required: false,
        },
        auditBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

const AuditLogs = mongoose.model("auditlogs", userSchema);

module.exports = AuditLogs;
