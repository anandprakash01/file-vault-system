const express = require("express");

const orgsController = require("../controllers/orgsController");

const router = express.Router();

router.get("/:orgId/files", orgsController.getFiles);

module.exports = router;
