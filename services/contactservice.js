const nodemailer = require("nodemailer");
const { adminTemplate, userTemplate } = require("../utils/contact");

exports.sendApplicationEmail = async ({ name, mobile, email, Subject,message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    await transporter.verify();

    const adminMailOptions = {
      from: `"Insight" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Inquiry Received",
      html: adminTemplate({ name, mobile, email, Subject,message }),
    };

    const userMailOptions = {
      from: `"Insight" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You For Contacting Insight",
      html: userTemplate({ name }),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("Admin & User emails sent successfully!");
  } catch (error) {
    console.error("Email Sending Error:", error);
    throw new Error(error.message || "Failed to send application email");
  }
};
