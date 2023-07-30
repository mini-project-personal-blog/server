require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });

      if (findUser) {
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (comparePassword) {
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
          );
          res.status(200).json({
            token,
            id: findUser.id,
          });
        } else {
          throw { name: "WrongPassword" };
        }
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
