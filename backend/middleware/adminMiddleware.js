const asyncHandler = require("express-async-handler");

const isAdminCheck = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
});

module.exports = { isAdminCheck };
