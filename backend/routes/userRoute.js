const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verifyToken = require("../middleWares/verifyToken");

router.post("/register", userController.addUser);
router.post("/login", userController.userLogin);
router.get("/profile", verifyToken, userController.profile);
module.exports = router;
