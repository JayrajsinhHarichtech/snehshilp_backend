const nodemailer = require("nodemailer");
require("dotenv").config();

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.verify();
    console.log("SMTP verified successfully!");
  } catch (err) {
    console.error("SMTP test failed:");
    console.error(err);
  }
}

testSMTP();
