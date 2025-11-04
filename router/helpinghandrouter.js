const express = require("express");
const router = express.Router();
const helpinghandcontroller = require("../controllers/helpinghandcontroller");

router.post("/helping", helpinghandcontroller.submitApplication);

module.exports = router;
