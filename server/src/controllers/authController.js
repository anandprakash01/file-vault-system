import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Organization from "../models/Organization.js";

import env from "../../config/env.js";
import AppError from "../utils/AppError.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
};

const registerUser = async (req, res) => {
  const {email, organization} = req.body;

  const alreadyRegistered = await User.exists({email});
  const isOrganization = await Organization.exists({_id: organization});

  if (!alreadyRegistered) {
    throw new AppError(400, "Email is already registered");
  }
  if (!isOrganization) {
    throw new AppError(400, "Organization does not exist");
  }

  const newUser = await User.create(req.body);

  const tokenPayload = {id: newUser._id};
  const token = jwt.sign(tokenPayload, env.JWT_SECRET_KEY, {expiresIn: env.JWT_EXPIRE});

  res.cookie("jwt", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      token,
      user: newUser,
    },
  });
};

const loginUser = async (req, res) => {};
const logoutUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

export {registerUser, loginUser, logoutUser, deleteUser};
