const nodemailer = require("nodemailer");
const { adminTemplate, userTemplate } = require("../utils/Intern");
const dotenv = require("dotenv");

dotenv.config();

exports.sendApplicationEnquiry = async ({
  name,
  email,
  mobile,
  position,
  message,
}) => {
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

    const adminMailOptions = {
      from: `"SnehShilp Foundation" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Volunteer / Intern Application",
      html: adminTemplate({ name, email, mobile, position, message }),
    };

    const userMailOptions = {
      from: `"SnehShilp Foundation" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You For Joining SnehShilp Foundation",
      html: userTemplate({ name }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("✅ Emails sent successfully!");
    return { success: true };
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw new Error("Failed to send enquiry email");
  }
};
