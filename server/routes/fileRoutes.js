const express = require("express");

const router = express.Router();
const fileController = require("../controllers/fileController");

router.post("/upload", fileController.handleUpload);
router.get("/:id/download", fileController.handleDownload);
router.get("/stats", fileController.getStats);

module.exports = router;
