const InternService = require("../services/Internservice");

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, mobile, position, message } = req.body;

    const errors = {};
    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!position?.trim()) errors.position = "Position is required";
    if (!message?.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await InternService.sendApplicationEnquiry({
      name,
      email,
      mobile,
      position,
      message,
    });

    return res.status(200).json({
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Submit Application Controller Error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};
