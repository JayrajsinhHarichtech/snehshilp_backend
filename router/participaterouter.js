const express = require("express");
const router = express.Router();
const participaterouter = require("../controllers/participatecontroller");

router.post("/participate", participaterouter.submitApplication);

module.exports = router;
///