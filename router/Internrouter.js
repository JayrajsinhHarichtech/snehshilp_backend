const express = require("express");
const router = express.Router();
const InternController = require("../controllers/Intercontroller");

router.post("/intern", InternController.submitApplication);

module.exports = router;
