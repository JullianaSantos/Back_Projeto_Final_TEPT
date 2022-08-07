const express = require('express');
const router = express.Router();
const ContactController = require('../../Controllers/ContactController')

router.post("/new-contact", async (req, res) => {
const { name, phone, email, opinion } = req.body;
  const response = await ContactController.createContact(
    name,
    phone,
    email,
    opinion
  );

  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

module.exports = router;