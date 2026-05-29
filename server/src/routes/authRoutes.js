import express from "express";

import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

import {validate} from "../middlewares/validate.js";
import {createUserValidator, loginUserValidator} from "../validations/userValidations.js";

const router = express.Router();

router.post("/register", validate(createUserValidator), registerUser);

router.post("/login", validate(loginUserValidator), loginUser);

router.get("/logout", logoutUser);

router.post("/delete", deleteUser);

export default router;
