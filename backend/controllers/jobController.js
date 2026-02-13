const Job = require("../models/Job");
const Skill = require("../models/Skill");
const Company = require("../models/Company");

const addJobData = async (req, res) => {
  try {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      company,
      similarJobs,
    } = req.body;

    // Find skills
    const skillData = await Skill.find({ name: { $in: skills } });
    const skillIds = skillData.map((skill) => skill._id);
    if (skillIds.length !== skills.length) {
      return res.status(400).json({ error: "Some skills not found" });
    }

    // Find company
    const companyData = await Company.findOne({ companyName: company });
    if (!companyData) {
      return res.status(400).json({ error: "Company not found" });
    }

    // Find similar jobs
    const similarJobsData = await Job.find({ title: { $in: similarJobs } });
    const similarJobsIds = similarJobsData.map((job) => job._id);
    console.log(similarJobsIds.slice(0, 3));
    // Create job
    const job = await Job.create({
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills: skillIds,
      company: companyData._id,
      similarJobs: similarJobsIds,
    });

    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getJobsData = async (req, res) => {
  const { search, employment_type, minimum_package } = req.query;
  try {
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (employment_type) {
      const typesArray = employment_type.split(",");
      filter.employmentType = { $in: typesArray };
    }

    if (minimum_package) {
      filter.packagePerAnnum = { $gte: Number(minimum_package) };
    }

    const jobsData = await Job.find(filter);
    res.status(200).json({ jobsData });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Server error" });
  }
};

const getSpecificJobData = async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) {
    return res.status(400).json({ error: "Invalid jobID" });
  }

  try {
    // Fetch the job by ID and populate skills, company, and similarJobs
    const job = await Job.findById(jobId)
      .populate("skills")
      .populate("company")
      .populate("similarJobs");

    if (!job) {
      return res.status(404).json({ error: "Job Not Found" });
    }

    // Build the final job object
    const jobWithSimilar = {
      ...job._doc,
      //  lifeAtCompany: job.company, // renamed for camelCase consistency
      similarJobs: job.similarJobs, // already populated
    };

    res.status(200).json({ jobData: jobWithSimilar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateJobData = async (req, res) => {
  const { jobId } = req.params;
  const { similarJobs } = req.body; // titles coming from UI

  try {
    // Convert titles to job IDs
    const similarJobsData = await Job.find({
      title: { $in: similarJobs },
    });

    const similarJobsIds = similarJobsData.map((job) => job._id);

    const jobData = await Job.findByIdAndUpdate(
      jobId,
      { similarJobs: similarJobsIds },
      { new: true, runValidators: true }
    ).populate("similarJobs");

    res.status(200).json({ jobData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { addJobData, getJobsData, getSpecificJobData, updateJobData };
