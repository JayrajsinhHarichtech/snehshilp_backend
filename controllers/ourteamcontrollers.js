const ourteamservice = require("../services/ourteamservice");

exports.submitApplication = async (req, res) => {
  try {
    const { name, email, mobile, Position, Start } = req.body;
    const Resume = req.file ? req.file.filename : null;

    const errors = {};
    if (!name?.trim()) errors.name = "Name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!mobile?.trim()) errors.mobile = "Mobile number is required";
    if (!Position?.trim()) errors.Position = "Position is required";
    if (!Start?.trim()) errors.Start = "Start is required";
    if (!Resume) errors.Resume = "Resume is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await ourteamservice.sendApplicationenquiry({
      name,
      email,
      mobile,
      Position,
      Start,
      Resume,
    });

    return res.status(200).json({
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Submit Application Controller Error:", error);
    return res
      .status(500)
      .json({ error:"Something went wrong, please try again later." });
  }
};
