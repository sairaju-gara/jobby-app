const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");

router.post("/add-skill", skillController.addSkill);
router.get("/getSkills", skillController.getSkillsData);
module.exports = router;
