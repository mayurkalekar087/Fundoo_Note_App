const jwt = require('jsonwebtoken');
require('dotenv').config();
const { logger } = require("../../logger/logger");
const bcrypt = require("bcrypt");
const queries = require("..//queries/user.queries");
const pool = require('..//..//config/database.config');

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
        user_id: data.user_id,
        email:data.email
      };
    return jwt.sign(dataForToken, process.env.ACCESS_TOKEN_KEY , { expiresIn: "24H" });
    };
     /**
    * @description function compare random strings
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * @returns
    */
    verifyString = (req,res,next)=>{
    try{
      const string = req.body.random_string;
      const values = [process.env.email];
      pool.query(queries.verifyString,values,(error,data)=>{
      console.log(string);
      console.log(JSON.stringify(data.rows[0].random_string));
      if (error) {
      logger.error("data does not found!");
      return res.status(401).send({success:false,message:"data is not there!"});

      }if (data.rows[0].random_string==string) {
          logger.info("string verified successfully!");
          next();
      }
       else{
           return res.status(200).send({success:false,message:"strings are not equal!"}); 
      }
      });
      } catch(error){
      return res.status(500).send({success:false,message:"something went wrong"});
    }
  }
   /**
   * verifytoken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
    verifyToken = (req, res, next) => {
      try {
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (decode) {
          logger.info("token verified");
          req.userData = decode;
          next();
        } else {
          logger.info("token verify error");
        }
      } catch (error) {
        res.status(401).send({
          error: "Your token has expiered",
        });
      }
  };
} 
module.exports = new Helper();