const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotEnv = require("dotenv");
dotEnv.config();
const verifyToken = async (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (!jwtToken) {
    return res.status(401).json({ errorMsg: "Invalid jwtToken" });
  }
  try {
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ errorMsg: "Invalid User" });
    }
    req.userId = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ errorMsg: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
