import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  // we called the cookie JWT because we set the cookie in the userController.js 
  // file with the name JWT and the value of the token that we got from the generateToken function

  token = req.cookies.jwt; // we put req.cookies.jwt inside the token variable
 


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // we wanna get the user from the database thats matched the user id now decoded is object that has the userId
      req.user = await User.findById(decoded.userId).select("-password"); // therefore we can say decoded.id because we set the userId in the jwt.sign
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
