const Skill = require("../models/Skill");

const addSkill = async (req, res) => {
  const skillData = req.body;
  if (!skillData || !skillData.length) {
    return res.status(400).json({ error: "No data found" });
  }
  try {
    const skillsData = await Skill.insertMany(skillData);
    res.status(200).json({ skillsData });
  } catch (error) {
    res.status(200).json({ message: "Server error" });
  }
};

const getSkillsData = async (req, res) => {
  try {
    const skillsData = await Skill.find();
    res.status(200).json({ skillsData });
  } catch (error) {
    res.status(200).json({ message: "Server error" });
  }
};
module.exports = { addSkill, getSkillsData };
