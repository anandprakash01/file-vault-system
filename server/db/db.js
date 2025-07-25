const mongoose = require("mongoose");

const connectDB = async () => {
    const mongodbURI = "mongodb://localhost:27017/filesystem";
    try {
        await mongoose.connect(mongodbURI, {});
        console.log("database Connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
