const jwt = require('jsonwebtoken');
require('dotenv').config();
const { logger } = require("../../logger/logger");
const bcrypt = require("bcrypt");

class Helper {
    hashing = (password, callback) => {
      bcrypt.hash(password, 10, (err, hashpassword) => {
        if (err) {
          logger.error("error is hashing");
          return callback(err, null);
        } else {
          return callback(null, hashpassword);
        }
      });
    };
    /**
       * Generate Token
       * @param {*} data
       * @param {*} callback
       */
  
    jwtTokenGenerate = (data) => {
      const dataForToken = {
        email: data.email,
        id: data.id
      };
      return jwt.sign(dataForToken, process.env.ACCESS_TOKEN_KEY , { expiresIn: "24H" });
    };
}
module.exports = new Helper();