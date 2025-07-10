const otpStore = {};

const optGenerator = () => {
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

const storeOtp = (email, otp) => {
  otpStore[email] = {
    otp: otp,
    expiryAt: Date.now() + 10 * 60 * 1000,
  };
};

const verifyOtp = (email, interotp) => {
  const data = otpStore[email];
  if (!data) {
    console.log("No OTP data found for email:", email);
    return false;
  }
  let isValid = interotp === data.otp && Date.now() < data.expiryAt;
  if (isValid) delete otpStore[email];
  return isValid;
};

module.exports = { storeOtp, optGenerator, verifyOtp };
