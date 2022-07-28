//Configuração
const express = require('express')
const bodyParser = require('body-parser')
const connectToDatabase = require('./config/connect');
const app = express()
require('dotenv/config');

connectToDatabase();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// Inicializando as rotas
const userRoutes = require('./routes/user')
const doctorRoutes = require('./routes/doctor/index.js')
const appointmentRoutes = require('./routes/appointment')

// app.use('/admin', adminRoutes)
app.use('/user',userRoutes)
app.use('/doctor', doctorRoutes)
app.use('/appointment', appointmentRoutes)



app.listen(8080, ()=>{
    console.log("Rodando")
})

