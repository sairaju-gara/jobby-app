const mongoose = require("mongoose");

const createJobSchema = new mongoose.Schema({
  title: String,
  companyLogoUrl: String,
  employmentType: String,
  jobDescription: String,
  location: String,
  packagePerAnnum: String,
  rating: Number,
  skills: [{ type: mongoose.Types.ObjectId, ref: "Skill" }],
  company: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  },

  similarJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

module.exports = mongoose.model("Job", createJobSchema);
