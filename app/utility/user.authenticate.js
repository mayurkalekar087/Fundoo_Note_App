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
  jwtTokenGenerate = (data) => {
      const dataForToken = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email:data.email
      };
      console.log(dataForToken);
    return jwt.sign(dataForToken, process.env.ACCESS_TOKEN_KEY , { expiresIn: "24H" });
    };
    verifyToken = (req, res, next) => {
      try{
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const code = myArr[1];
        const decode = jwt.verify(code, process.env.ACCESS_TOKEN_KEY);
        
        if (decode) {
          logger.info("token verified");
          req.userData = decode;
          next();
        } else {
          logger.info("token verify error");
        }
      } catch (error) {
        res.status(401).send({
          error: "Your token has expiered"
        });
      }
  };
}
module.exports = new Helper();