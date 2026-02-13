const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.post("/add-company", companyController.addCompany);
router.get("/getCompany", companyController.getCompanyData);

module.exports = router;
