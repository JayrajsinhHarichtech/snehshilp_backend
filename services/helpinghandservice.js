const nodemailer = require("nodemailer");
const { adminTemplate, userTemplate } = require("../utils/helpinghand");
const dotenv = require("dotenv");

dotenv.config();

const sendApplicationEnquiry = async ({ name, email, mobile, Project }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Connection Successful!");

    const adminMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Inquiry Received",
      html: adminTemplate({ name, email, mobile, Project }),
    };

    const userMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You For Contacting Snehshilp",
      html: userTemplate({ name }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("📧 Emails sent successfully!");
    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    console.error("❌ Email Sending Error:", error.message);
    throw new Error("Failed to send enquiry email. Check SMTP credentials.");
  }
};

module.exports = { sendApplicationEnquiry };
