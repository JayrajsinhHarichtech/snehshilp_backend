const nodemailer = require("nodemailer");
const { adminTemplate, userTemplate } = require("../utils/participateutils");
const dotenv = require("dotenv");

dotenv.config();

exports.sendApplicationenquiry = async ({ name, email, mobile, Pincode, Address }) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // True for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Optional but can be set to avoid TLS errors
      },
    });

    // Admin email options (Notification email to admin)
    const adminMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`, // Sender address
      to: process.env.MAIL_TO, // Admin email (configured in .env)
      subject: "New Inquiry Received",
      html: adminTemplate({ name, email, mobile, Pincode, Address }), // HTML email body for admin
    };

    // User email options (Thank You email to user)
    const userMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`, // Sender address
      to: email, // User's email
      subject: "Thank You For Contacting Snehshilp",
      html: userTemplate({ name }), // HTML email body for the user
    };

    // Sending the emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("Emails sent successfully!");
    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw new Error("Failed to send enquiry email");
  }
};
