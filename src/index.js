//Configuração
const express = require('express')
const bodyParser = require('body-parser')
const connectToDatabase = require('./config/connect');
const cors = require('cors');
const app = express();
require('dotenv/config');

connectToDatabase();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());

app.use((req, res, next) =>{
    console.log('Acessou o Middleware!')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});

// Inicializando as rotas
const userRoutes = require('./routes/user')
const doctorRoutes = require('./routes/doctor/index.js')
const appointmentRoutes = require('./routes/appointment')
const uploadimgRoutes = require('./routes/uploadimg')
const contactRoutes = require('./routes/contact')


// app.use('/admin', adminRoutes)
app.use('/user',userRoutes)
app.use('/doctor', doctorRoutes)
app.use('/appointment', appointmentRoutes)
app.use('/upload', uploadimgRoutes)
app.use('/contact', contactRoutes)





const PORT = process.env.PORT || 8080 
app.listen(PORT, err =>{
    if(err) throw err;
    console.log("Rodando")
})

