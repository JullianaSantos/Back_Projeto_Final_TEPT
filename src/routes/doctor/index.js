const express = require("express");
const AuthDoctorMiddlewares = require('../../Middlewares/AuthDoctorMiddleware');
const LoginDoctorController = require('../../Controllers/LoginDoctorController')
const router = express.Router();
const bcrypt = require('bcryptjs');
const DoctorController = require("../../Controllers/DoctorController");
const Doctor = require("../../Models/Doctor");

router.get("/", (req, res) => {
  res.send("Pagina adm");
});

// http://localhost:8080/doctor/

router.post("/register", async (req, res) => {
  let doctorExist = await Doctor.findOne({email: req.body.email});
  if(doctorExist){
    return res.status(400).json({
      error: true,
      message: "Este médico já existe!"
    })
  }

  // const Doc = await Doctor.find({ where: { email } });
  // console.log(Doc);
  // Doctor.find({ where: { cod } });

  const { name, org, cod, birth, phone, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10)
  const response = await DoctorController.createDoctor(name, org, cod, birth, phone, email, hashPassword);

  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.post("/login", LoginDoctorController.loginDoctor)

router.get("/list",AuthDoctorMiddlewares, async (req, res) => {
  const Doctor = await DoctorController.getDoctor();
  res.json(Doctor);
});

router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  console.l;
  const response = await DoctorController.getOneDoctor(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.put("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findByIdAndRemove(id);

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
