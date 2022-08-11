const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  opinion: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", Contact);
