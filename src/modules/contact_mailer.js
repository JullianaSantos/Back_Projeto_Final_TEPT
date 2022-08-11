const { SchemaTypeOptions } = require("mongoose");
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

function sendMail(transporter, contact) {
  console.log(contact.name);
  const mailData = {
    from: process.env.PROJECT_EMAIL,
    to: process.env.PROJECT_EMAIL,
    subject: "Olá, você recebeu um novo contato!",
    text: `Nome: ${contact.name}\nNúmero: ${contact.phone}\nEmail: ${contact.email}\nContato: ${contact.opinion}`,
  };

  transporter.sendMail(mailData);
}

module.exports = sendMail;
