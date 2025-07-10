const { Resend } = require("resend");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const resend = new Resend(process.env.RESEND_API_KEY);

const resendEmail = async (email, otp) => {
  const templatePath = path.join(__dirname, "..", "views", "otpTemplate.ejs");
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, { otp });
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: html,
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = resendEmail;
