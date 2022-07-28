const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema({
    name:{
        type: String,
        required: true 
    },
    id_user:{
        type: String,
        required: true
    },
    id_doctor:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('appointment', Appointment)