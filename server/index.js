const express = require("express");
require("dotenv").config();

const connectDB = require("./db/db");

const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const orgsRoutes = require("./routes/orgRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
    console.log("server is running");
});

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/files", fileRoutes);
// app.use("/audit");
app.use("/orgs", orgsRoutes);
