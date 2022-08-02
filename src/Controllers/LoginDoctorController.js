const Doctor = require("../Models//Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

module.exports = {
  async loginDoctor(req, res) {
    const { email, password } = req.body;

    const doctorExist = await Doctor.findOne({ email });

    if (!doctorExist) {
      return res.status(400).json({
        error: true,
        message: "Médico não existe!",
      });
    }

    if (!bcrypt.compareSync(password, doctorExist.password)) {
      return res.status(400).json({
        error: true,
        message: "A senha está incorreta!",
      });
    }

    return res.status(200).json({
      user: {
        name: doctorExist.name,
        email: doctorExist.email,
      },
      token: jwt.sign({ id: doctorExist._id }, config.secret, {
        expiresIn: config.expireIn,
      }),
    });
  },
};
