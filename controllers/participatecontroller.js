const participateservices = require("../services/participateservices");

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, mobile, Pincode, Address } = req.body;

    const errors = {};

    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!Pincode?.trim()) errors.Pincode = "Pincode is required";
    if (!Address?.trim()) errors.Address = "Address is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    await participateservices.sendApplicationenquiry({
      name,
      email,
      mobile,
      Pincode,
      Address,
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
