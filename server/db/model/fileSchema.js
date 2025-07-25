const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
    {
        file: {
            type: String,
            required: false,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

const Files = mongoose.model("file", fileSchema);

module.exports = File;
