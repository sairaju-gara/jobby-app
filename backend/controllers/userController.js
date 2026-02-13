const User = require("../models/User");
const dotEnv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotEnv.config();
const addUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(400).json({ errorMsg: "User already exist" });
  }

  if (!password) {
    return res.status(400).json({ errorMsg: "Invalid Password" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (phoneNumber.length !== 10) {
    return res.status(400).json({ errorMsg: "Invalid PhoneNumber" });
  }

  try {
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ errorMsg: "Invalid creditinals" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(400).json({ errorMsg: "User not found" });
  }
  const userDetails = {
    userId: checkUser._id,
  };
  try {
    const isPasswordMatched = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!isPasswordMatched) {
      return res.status(401).json({ errorMsg: "Invalid password" });
    }
    const jwtToken = jwt.sign(userDetails, process.env.SECRET_KEY);
    res.status(200).json({ jwtToken });
  } catch (error) {
    res.status(500).json({ errorMsg: "Server error" });
  }
};

const profile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ errorMsg: "User not found" });
    }

    res.status(200).json({
      profileDetails: {
        name: user.username,
        email: user.email,
        profileImageUrl:
          "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
      },
    });
  } catch (error) {
    res.status(500).json({ errorMsg: "Server error" });
  }
};

module.exports = { addUser, userLogin, profile };
