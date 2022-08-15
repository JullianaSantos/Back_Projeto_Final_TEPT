const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  healthPlan: {
    type: String,
    required: true,
  },
  firstAppointment: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("appointment", Appointment);
