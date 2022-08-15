const express = require("express");
const AuthDoctorMiddlewares = require("../../Middlewares/AuthDoctorMiddleware");
const LoginDoctorController = require("../../Controllers/LoginDoctorController");
const router = express.Router();
const bcrypt = require("bcryptjs");
const DoctorController = require("../../Controllers/DoctorController");
const Doctor = require("../../Models/Doctor");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendMail = require("../../modules/doctor_mailer");

router.get("/", (req, res) => {
  res.send("Pagina adm");
});

router.get("/list", AuthDoctorMiddlewares, async (req, res) => {
  const Doctor = await DoctorController.getDoctor();
  res.json(Doctor);
});

router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  const response = await DoctorController.getOneDoctor(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.post("/find/doctor", AuthDoctorMiddlewares, async (req, res) =>{
  const id = req.doctor_id;
  const response = await DoctorController.getOneDoctor(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
} )

// http://localhost:8080/doctor/

router.post("/register", async (req, res) => {
  let doctorExist = await Doctor.findOne({ email: req.body.email });
  if (doctorExist) {
    return res.status(400).json({
      error: true,
      message: "Este médico já existe!",
    });
  }

  let DoctorCodExist = await Doctor.findOne({ cod: req.body.cod });
  if (DoctorCodExist) {
    return res.status(400).json({
      error: true,
      message: "Este código já está cadastrado!",
    });
  }

  const { name, org, cod, birth, phone, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const response = await DoctorController.createDoctor(
    name,
    org,
    cod,
    birth,
    phone,
    email,
    hashPassword
  );

  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.post("/login", LoginDoctorController.loginDoctor);

router.put("/newPassword", async (req, res) => {
  const { email, newPassword } = req.body;
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.PROJECT_EMAIL,
      pass: process.env.PROJECT_PASSWORD,
    },
    secure: true,
  });
  const token = await jwt.sign({ email, newPassword }, process.env.SECRET, {
    expiresIn: 10000,
  });
  sendMail(transporter, email, token);
  return res.json("Processo de redefinir senha quase concluído! Clique no link enviado para o seu email.");
});

router.get("/updatePassword/:token", async (req, res) => {
  const token = req.params.token;
  const data = jwt.verify(token, process.env.SECRET);
  const hashPassword = await bcrypt.hash(data.newPassword, 10);

  await Doctor.findOneAndUpdate(
    { email: data.email },
    { password: hashPassword },
    { new: true }
  );

  return res.json("Senha atualizada com sucesso!");
});


router.put("/:id", async (req, res) => {
  const updateValues = {
    ...(req.body.name ? { name: req.body.name } : {}),
    ...(req.body.cpf ? { cpf: req.body.cpf } : {}),
    ...(req.body.birth ? { birth: req.body.birth } : {}),
    ...(req.body.phone ? { phone: req.body.phone } : {}),
    ...(req.body.email ? { email: req.body.email } : {}),
    ...(req.body.password ? { password: req.body.password } : {}),
  };

  const hashPassword = updateValues.password && await bcrypt.hash(updateValues.password,10) || null
  const _id = req.params.id;

  const user = await Doctor.findOneAndUpdate({ _id },{ ...updateValues, ...(updateValues.password ? { password: hashPassword } : {})}, { new: true });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "erro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findByIdAndRemove(id);

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
