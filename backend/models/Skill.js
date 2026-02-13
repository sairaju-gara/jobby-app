const mongoose = require("mongoose");

const createSkillSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

module.exports = mongoose.model("Skill", createSkillSchema);
