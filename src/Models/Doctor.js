const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Doctor = new Schema({
  name: {
    type: String,
    required: true,
  },
  org: {
    type: String,
    required: true,
  },
  cod: {
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
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("doctor", Doctor);
