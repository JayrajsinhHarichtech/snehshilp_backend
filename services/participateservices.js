const nodemailer = require("nodemailer");
const { adminTemplate, userTemplate } = require("../utils/participateutils");
const dotenv = require("dotenv");

dotenv.config();

exports.sendApplicationenquiry = async ({ name, email, mobile, Pincode, Address }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const adminMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`, 
      to: process.env.MAIL_TO,
      subject: "New Inquiry Received",
      html: adminTemplate({ name, email, mobile, Pincode, Address }), 
    };

    const userMailOptions = {
      from: `"Snehshilp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You For Contacting Snehshilp",
      html: userTemplate({ name }), 
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("Emails sent successfully!");
    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw new Error("Failed to send enquiry email");
  }
};
