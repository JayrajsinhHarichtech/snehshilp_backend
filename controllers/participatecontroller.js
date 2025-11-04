const participateservices = require("../services/participateservices");

exports.submitApplication = async (req, res) => {
  try {
    // Destructuring the data from the request body
    const { name, email, mobile, Pincode, Address } = req.body;

    const errors = {};

    // Input validation
    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!Pincode?.trim()) errors.Pincode = "Pincode is required";
    if (!Address?.trim()) errors.Address = "Address is required";

    // If there are any validation errors, send them back
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Send application enquiry (Email sending)
    await participateservices.sendApplicationenquiry({
      name,
      email,
      mobile,
      Pincode,
      Address,
    });

    // Send success response
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
