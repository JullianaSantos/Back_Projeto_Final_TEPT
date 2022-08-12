const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "teptinstituto@gmail.com",
  auth: {
    user: process.env.PROJECT_EMAIL,
    pass: process.env.PROJECT_PASSWORD,
  },
  secure: true,
});

function sendMail(transporter, to, token) {
  const mailData = {
    from: process.env.PROJECT_EMAIL,
    to: to,
    subject: "Mensagem, clique aqui!",
    text: "Texto!",
    html:
      "<a href='https://institutotept.herokuapp.com/doctor/" +token + "'>Mudar senha</a>",
  };

  transporter.sendMail(mailData);
}

module.exports = sendMail;
