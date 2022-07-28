const mongoose = require('mongoose')

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@backprojetofinal.hb8mj.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
        console.log('Conexão realizada')
    }).catch(()=>{
        console.log('Erro na conexão')
    })
}


module.exports = connectToDatabase;