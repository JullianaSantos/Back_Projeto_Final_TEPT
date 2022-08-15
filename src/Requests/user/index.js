const express = require("express");
const AuthUserMiddlewares = require("../../Middlewares/AuthUserMiddleware");
const LoginUserController = require("../../Controllers/LoginUserController");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserController = require("../../Controllers/UserController");
const User = require("../../Models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendMail = require("../../modules/user_mailer");

router.get("/", (req, res) => {
  res.json({
    msg: "Deploy concluído",
  });
});

// http://localhost:8080/user/list
router.get("/list", async (req, res) => {
  const Users = await UserController.getUsers();
  res.json(Users);
});

// http://localhost:8080/user/62d3764573536b7ecb70c4ba
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await UserController.getOneUser(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.post("/find/user", AuthUserMiddlewares, async (req, res) =>{
  const id = req.user_id;
  const response = await UserController.getOneUser(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
} )

// http://localhost:8080/user/register

router.post("/register", async (req, res) => {
  let userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      error: true,
      message: "Este usuário já existe!",
    });
  }
  let userCpfExist = await User.findOne({ cpf: req.body.cpf });
  if (userCpfExist) {
    return res.status(400).json({
      error: true,
      message: "Este cpf já está cadastrado!",
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
  return res.json(
    "Processo de redefinir senha quase concluído! Clique no link enviado para o seu email."
  );
});

router.get("/updatePassword/:token", async (req, res) => {
  const token = req.params.token;
  const data = jwt.verify(token, process.env.SECRET);
  const hashPassword = await bcrypt.hash(data.newPassword, 10);
  await User.findOneAndUpdate(
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

  const user = await User.findOneAndUpdate({ _id },{ ...updateValues, ...(updateValues.password ? { password: hashPassword } : {})}, { new: true });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "erro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
