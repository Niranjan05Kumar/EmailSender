const { Resend } = require('resend');
require('dotenv').config();

const resent = new Resend(process.env.RESEND_API_KEY);

const mailSend = async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields: to, subject, message' 
    });
  }
  
  const html = `<h3>${subject}</h3><p>${message}</p>`;
  try {
    const data = await resent.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
};

module.exports = mailSend;
