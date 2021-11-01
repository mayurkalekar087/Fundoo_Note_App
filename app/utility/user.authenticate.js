const jwt = require('jsonwebtoken');
require('dotenv').config();
//const { logger } = require("../../logger/logger");

class Helper {
  
    jwtTokenGenerate = (data) => {
      const dataForToken = {
        email: data.email,
        id: data.id
      };
      return jwt.sign(dataForToken, process.env.ACCESS_TOKEN_KEY , { expiresIn: "24H" });
    };
}
module.exports = new Helper();