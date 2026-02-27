
import nodemailer from "nodemailer";
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("❌ Email server connection error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});