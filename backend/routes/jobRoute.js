const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const verifyToken = require("../middleWares/verifyToken");
router.post("/add-job", jobController.addJobData);
router.get("/getJobsData", jobController.getJobsData);
router.get("/:jobId", jobController.getSpecificJobData);
router.put("/update/:jobId", jobController.updateJobData);
module.exports = router;
