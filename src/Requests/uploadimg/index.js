const express = require("express");
const upload = require("../../config/multer");
const router = express.Router();
const UploadImage = require("../../Models/UploadImage");

router.post("/", upload.single("file"), async (req, res) => {
  const { originalname: name, size, filename: key } = req.file;
  const upload = await UploadImage.create({
    name,
    size,
    key,
  });
  console.log(req.file);
  return res.json({
    type: "success",
    message: "Imagem adicionada com sucesso!",
    filename: req.file.filename,
  });
});

module.exports = router;
