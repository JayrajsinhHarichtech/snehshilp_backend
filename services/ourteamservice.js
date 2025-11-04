const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { adminTemplate, userTemplate } = require("../utils/ourteam");
const dotenv = require("dotenv");

dotenv.config();

exports.sendApplicationenquiry = async ({ name, email, mobile, Position, Start, Resume }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const resumePath = path.join(__dirname, "../uploads", Resume);

    const adminMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Team Application Received",
      html: adminTemplate({ name, email, mobile, Position, Start, Resume }),
      attachments: fs.existsSync(resumePath)
        ? [{ filename: Resume, path: resumePath }]
        : [],
    };

    const userMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You For Contacting Snehshilp",
      html: userTemplate({ name }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("✅ Emails sent successfully!");
    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
    throw new Error("Failed to send enquiry email");
  }
};
