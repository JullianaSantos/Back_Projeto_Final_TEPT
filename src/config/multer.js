const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/tmp/uploads/");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      cb(null, Date.now() + "-" + file.originalname);
    });
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const alloweMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (alloweMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido!"));
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
