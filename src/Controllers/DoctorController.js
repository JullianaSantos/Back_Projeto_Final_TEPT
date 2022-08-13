const Doctor = require("../Models//Doctor");

module.exports = {
  async createDoctor(name, org, cod, birth, phone, email, password) {
    try {
      const newDoctor = await Doctor.create({
        name,
        org,
        cod,
        birth,
        phone,
        email,
        password,
      });
      return { message: newDoctor, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async getDoctor() {
    try {
      const Doctors = await Doctor.find();
      return { Doctors, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM

  async getOneDoctor(id) {
    try {
      const foundDoctor = await Doctor.findById(id);
      return { message: foundDoctor, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM

  async updateDoctor(id) {
    try {
      const modifyDoctor = await Doctor.findOneAndUpdate(id, req.body, {
        new: true,
      });
      return { message: modifyDoctor, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async deleteDoctor(id) {
    try {
      const removeDoctor = await Doctor.findByIdAndRemove(id);
      return { message: removeDoctor, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
};
