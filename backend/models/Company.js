const mongoose = require("mongoose");

const createCompanySchema = new mongoose.Schema({
  companyName: String,
  companyWebsiteUrl: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("Company", createCompanySchema);
