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
     * @description   : creating token using jsonwebtoken module
     * @param {data} as data which comes from the body of postmen
     * @module        : jwt
    */
  jwtTokenGenerate = (data) => {
      const dataForToken = {
        id: data.id,
        email:data.email
      };
    return jwt.sign(dataForToken, process.env.ACCESS_TOKEN_KEY , { expiresIn: "24H" });
    };
     /**
    * @description function checks and validates the user token and authorises only if token is correct
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * @returns
    */
    verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    console.log("header:: " + header);
    const myArr = header.split("bearer");
    const token = myArr[1];
    console.log("token:: " + token);
     try {
       if (token) {
         jwt.verify(token, process.env.SECRET_KEY_FOR_RESET, (err, decodedToken) => {
           if (err) {
             return res.status(400).send({ success: false, message: "Invalid Token" });
           } else {
             req.data.id = decodedToken;
             next();
           }
         });
       } else {
         return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
       }
     } catch (error) {
       return res.status(500).send({ success: false, message: "Something went wrong!" });
     }
   }
}
module.exports = new Helper();