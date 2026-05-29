import mongoose from "mongoose";

import env from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`[DATABASE] mongodb cluster connected to ${conn.connection.host}`);
  } catch (err) {
    console.log(`[DATABASE CRASH] Initial Connection Failed`);
    console.log(err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log(
      `[DATABASE CRASH] TCP connection lost at ${new Date().toLocaleString()}, attempting to reconnect...`,
    );
  });

  mongoose.connection.on("reconnected", () => {
    console.log(`[DATABASE] TCP connection restored at ${new Date().toLocaleString()}`);
  });
};

export default connectDB;
