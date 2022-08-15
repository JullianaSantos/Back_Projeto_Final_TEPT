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
    subject: "Para concluir o processo de redefinir senha, clique aqui!",
    text: "Texto!",
    html:
      "<a href='https://institutotept.herokuapp.com/doctor/updatePassword/" +token+ "'>Mudar senha</a>",
  };

  transporter.sendMail(mailData);
}

module.exports = sendMail;
