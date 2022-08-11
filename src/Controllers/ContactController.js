const Contact = require("../Models/Contact");

module.exports = {
  async createContact(name, phone, email, opinion) {
    try {
      const newUser = await Contact.create({
        name,
        phone,
        email,
        opinion,
      });
      return { message: newUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
};
