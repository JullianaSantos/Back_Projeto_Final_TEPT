const express = require("express");
const router = express.Router();
const ContactController = require("../../Controllers/ContactController");
const nodemailer = require("nodemailer");
const sendMail = require("../../modules/contact_mailer");

router.post("/", async (req, res) => {
  const { name, phone, email, opinion } = req.body;
  const response = await ContactController.createContact(
    name,
    phone,
    email,
    opinion
  );

  if (response.status == 200) {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.PROJECT_EMAIL,
        pass: process.env.PROJECT_PASSWORD,
      },
      secure: true,
    });
    sendMail(transporter, { name, phone, email, opinion });
    res.json(response);
  } else {
    res.json(response);
  }
});

module.exports = router;
