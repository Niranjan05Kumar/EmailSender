const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resendEmail = require("./lib/resend");
const { optGenerator, storeOtp, verifyOtp } = require("./utils/otpStore");

require("dotenv").config();
app.set("view engine", "ejs");

app.post("/sendmail", async (req, res) => {
  const { email } = req.body;
  const otp = optGenerator();
  await storeOtp(email, otp);
  resendEmail(email, otp);
  res.send("Email sent successfully");
});

app.post("/verifyotp", (req, res) => {
  try {
    const { email, otp } = req.body;
    let isValid = verifyOtp(email, otp);
    if (isValid) {
      res.send("OTP varify successfully");
    } else {
      res.send("Invalid OTP or OTP expired");
    }
  } catch (error) {
    res.send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
