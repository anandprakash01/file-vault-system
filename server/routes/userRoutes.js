const express = require("express");

const signUpAuth = require("../middlewares/signupAuth");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUpAuth, userController.handleSignup);
router.post("/signin", userController.handleSignin);

module.exports = router;
