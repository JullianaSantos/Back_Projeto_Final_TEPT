const mongoose = require('mongoose');

const UploadImg = new mongoose.Schema({
    name:String,
    size: Number,
    key: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("UpdateImg", UploadImg);