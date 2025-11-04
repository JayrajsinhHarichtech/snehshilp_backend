const contactservice = require("../services/contactservice");

exports.submitApplication = async (req, res) => {
  try {
    const { name, mobile, email, Subject, message } = req.body;

    const errors = {};
    if (!name?.trim()) errors.name = "Name is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!Subject?.trim()) errors.Subject = "Subject is required";
    if (!message?.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await contactservice.sendApplicationEmail({ name, mobile, email, Subject, message });

    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Submit Application Controller Error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};
