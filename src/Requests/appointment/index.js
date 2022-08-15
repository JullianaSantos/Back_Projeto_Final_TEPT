const express = require("express");
const router = express.Router();
const AppointmentController = require("../../Controllers/AppointmentController");
const Appointment = require("../../Models/Appointment");
const Doctor = require("../../Models/Doctor");
const User = require("../../Models/User");

router.get("/", (req, res) => {
  res.send("Pagina adm");
});

// http://localhost:8080/appointment/

router.post("/register", async (req, res) => {
  const { name, speciality, date, hour, healthPlan, firstAppointment, motivation } = req.body;
  const response = await AppointmentController.createAppointment(
    name,
    speciality,
    date,
    hour,
    healthPlan,
    firstAppointment,
    motivation
  );

  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.get("/list", async (req, res) => {
  const Appointments = await AppointmentController.getAllAppointments();
  res.json(Appointments);
});

router.get("/find/user/:id", async (req, res) => {
  const User = req.id_user;

  const response = await AppointmentController.getAppointmentByUser(User);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.get("/find/doctor/:id", async (req, res) => {
  const Doctor = req.params.id_doctor;

  const response = await AppointmentController.getAppointmentByDoctor(Doctor);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByIdAndRemove(id);

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
