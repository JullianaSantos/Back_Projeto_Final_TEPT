const Appointment = require("../Models//Appointment");

module.exports = {
  async createAppointment(name, speciality, date, hour, healthPlan, firstAppointment, motivation) {
    try {
      const newAppointment = await Appointment.create({
        name,
        speciality,
        date,
        hour,
        healthPlan,
        firstAppointment,
        motivation,
      });
      return { message: newAppointment, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async getAllAppointments() {
    try {
      const Appointments = await Appointment.find();
      console.log(Appointments);
      return { Appointments, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM

  async getAppointmentByUser(User) {
    try {
      const appointmentByUser = await Appointment.find({ id_user: User });
      return { message: appointmentByUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM / User

  async getAppointmentByDoctor(Doctor) {
    try {
      const appointmentByDoctor = await Appointment.find({ id_doctor: Doctor });
      return { message: appointmentByDoctor, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM / User

  async updateAppointment(id) {
    try {
      const modifyAppointmente = await Appointment.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      return { message: modifyAppointmente, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async deleteAppointment(id) {
    try {
      const removeAppointment = await Appointment.findByIdAndRemove(id);
      return { message: removeAppointment, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async getAppointmentFeedback(id_doctor) {
    try {
      const appointmentFeedback = await Appointment.find(id_doctor);
      return { message: appointmentFeedback, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
};
