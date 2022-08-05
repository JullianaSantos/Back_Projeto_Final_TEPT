const express = require("express");
const AuthUserMiddlewares = require("../../Middlewares/AuthUserMiddleware");
const LoginUserController = require("../../Controllers/LoginUserController");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserController = require("../../Controllers/UserController");
const User = require("../../Models//User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendMail = require("../../modules/mailer");

router.get("/", (req, res) => {
  res.json({
    msg: "Deploy concluído",
  });
});

// http://localhost:8080/user/register

router.post("/register", async (req, res) => {
  let userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      error: true,
      message: "Este usuário já existe!",
    });
  }

  const { name, cpf, birth, phone, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const response = await UserController.createUser(
    name,
    cpf,
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

router.post("/login", LoginUserController.loginUser);

router.post("/forgot-password", async (req, res) => {
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
  return res.json("Olá");
});

router.get("/change-password/:token", async (req, res) => {
  const token = req.params.token;
  const data = jwt.verify(token,process.env.SECRET);
  const hashPassword = await bcrypt.hash(data.newPassword, 10);
  const newUser = await User.findOneAndUpdate({email: data.email}, {password: hashPassword}, {new:true})
  return res.json("Senha atualizada com sucesso!");
});

// http://localhost:8080/user/list
router.get("/list", AuthUserMiddlewares, async (req, res) => {
  const Users = await UserController.getUsers();
  res.json(Users);
});

// http://localhost:8080/user/find/62d3764573536b7ecb70c4ba
router.get("/find/:id", async (req, res) => {
  const id = req.params.id;
  console.l;
  const response = await UserController.getOneUser(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.put("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


module.exports = router;
