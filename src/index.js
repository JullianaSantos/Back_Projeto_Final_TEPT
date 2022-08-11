//Configuração
const express = require("express");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/connect");
const cors = require("cors");
const app = express();
require("dotenv/config");

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Acessou o Middleware!");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// Inicializando as rotas
const userRoutes = require("./Requests/user");
const doctorRoutes = require("./Requests/doctor");
const appointmentRoutes = require("./Requests/appointment");
const uploadimgRoutes = require("./Requests/uploadimg");
const contactRoutes = require("./Requests/contact");

// app.use('/admin', adminRoutes)
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/upload", uploadimgRoutes);
app.use("/contact", contactRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Rodando");
});
