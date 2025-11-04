const helpinghandservice = require("../services/helpinghandservice");

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, mobile, Project } = req.body;

    const errors = {};
    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!Project?.trim()) errors.Project = "Project is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await helpinghandservice.sendApplicationEnquiry({
      name,
      email,
      mobile,
      Project,
    });

    return res.status(200).json({
      message: "Application submitted successfully ✅",
    });
  } catch (error) {
    console.error("❌ Submit Application Error:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};
