const express = require("express");
const { submitApplication } = require("../controllers/contactcontroller");

const router = express.Router();

router.post("/Contact", submitApplication);

module.exports = router;
