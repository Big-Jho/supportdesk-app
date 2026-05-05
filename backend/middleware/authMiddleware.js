const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Get id from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user exist
      req.user = await User.findById(decoded.id).select("-password");
      // console.log(req.user);

      if (!req.user) {
        res.status(200);
        throw new Error("Not authorized");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
