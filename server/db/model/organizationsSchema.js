const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },
});

const Organizations = mongoose.model("organization", organizationSchema);

module.exports = Organizations;
