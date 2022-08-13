const User = require("../Models//User");

module.exports = {
  async createUser(name, cpf, birth, phone, email, password) {
    try {
      const newUser = await User.create({
        name,
        cpf,
        birth,
        phone,
        email,
        password,
      });
      return { message: newUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async getUsers() {
    try {
      const Users = await User.find();
      return { Users, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM

  async getOneUser(id) {
    try {
      const foundUser = await User.findById(id);
      return { message: foundUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  }, // ADM

  async updateUser(id) {
    try {
      const modifyUser = await User.findOneAndUpdate(id, req.body, {
        new: true,
      });
      return { message: modifyUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },

  async deleteUser(id) {
    try {
      const removeUser = await User.findByIdAndRemove(id);
      return { message: removeUser, status: 200 };
    } catch (error) {
      return { message: error, status: 400 };
    }
  },
};
