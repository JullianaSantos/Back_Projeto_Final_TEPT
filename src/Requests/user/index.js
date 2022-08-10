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
  return res.json("Olá");
});

router.get("/:token", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.l;
  const response = await UserController.getOneUser(id);
  if (response.status == 200) {
    res.json(response);
  } else {
    res.json(response);
  }
});

router.put("/:id", async (req, res) => {
  
   const  { name, cpf, birth, phone, email, password} = req.body;
  
    const hashPassword = await bcrypt.hash(password, 10);
    const data = { name, cpf, birth, phone, email, password: hashPassword};
    const _id =(req.params.id)
  
    const user = await User.findOneAndUpdate({_id}, data, { new: true });
    
    if (user) {
      res.status(200).json(user);
    }else{
      res.status(500).json({error:"erro"});
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
