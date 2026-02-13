const Company = require("../models/Company");

const addCompany = async (req, res) => {
  const data = req.body;
  if (!data || !data.length) {
    return res.status(400).json({ error: "No data found" });
  }
  try {
    const companyData = await Company.insertMany(data);
    res.status(200).json({ companyData });
  } catch (error) {
    res.status(200).json({ message: "Server error" });
  }
};
const getCompanyData = async (req, res) => {
  try {
    const companyData = await Company.find();
    res.status(200).json({ companyData });
  } catch (error) {
    res.status(200).json({ message: "Server error" });
  }
};
module.exports = { addCompany, getCompanyData };
