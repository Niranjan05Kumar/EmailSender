const nodemailer = require("nodemailer");

const mailSend = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "albert.tromp51@ethereal.email",
      pass: "safdzE9Gjvw7kPnfFS",
    },
  });

  const info = await transporter.sendMail({
    from: '"Neeraj" <neeraj@gmail.com>',
    to: "ashu@example.com",
    subject: "For Nodemailer Testing",
    text: "Hello Ashu, from nodemailer. Here is some additional content for your message.",
    html: "<b>Hello Ashu</b><p>Here is some additional content for your message.</p>",
  });

  res.send(info);
};

module.exports = mailSend;
