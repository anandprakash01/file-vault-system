import jwt from "jsonwebtoken";

import User from "../models/User.js";

import AppError from "../utils/AppError.js";
import env from "../../config/env.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    console.log("Bearer Token Found");
    token = req.headers.authorization.split(" ")[2];
  } else if (req.cookies?.jwt) {
    console.log("Cookie Token Found");
    token = req.cookie.token;
  }

  if (!token) {
    throw new AppError(401, "You are not logged in, Please login to get access");
  }

  const decodedToken = jwt.verify(token, env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) {
    throw new AppError(401, "The user does not exist, Please login again");
  }
  req.user = currentUser;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new AppError(401, "Admin access required");
  }
  next();
};
export {protect};
