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
        firstName:data.firstName,
        lastName:data.lastName,
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
        const myArr = header.split(" ");
        const token = myArr[1];
        try{
          if(token){
            //console.log("token:: " + token);
         jwt.verify(token, process.env.ACCESS_TOKEN_KEY,(error,decoded)=>{
          if (error) {
            return res.status(400).send({ success: false, message: "Invalid Token" });
          }else{
            logger.info("token verified");
            req.userData = decoded;
            next();
          }
         });
        } else {
          logger.info("token verify error");
          return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
        }
      } catch (error) {
          return res.status(500).send({ success: false, message: "Something went wrong!" });
      }
  };
}
module.exports = new Helper();