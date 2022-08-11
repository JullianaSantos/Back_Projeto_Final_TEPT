const mongoose = require("mongoose");

const UploadImage = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UpdateImage", UploadImage);
