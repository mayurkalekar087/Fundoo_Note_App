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
   verifyToken = (req,res,next)=>{
     try{
       const code  = req.body.token;
       console.log(code);
      const values = [process.env.email]
      pool.query(queries.verifyToken,values,(err,data)=>{
       if(err){
         return res.status(404).send({success:false,message:"invalid"});
       }else{
        (data==code)
        //return res.status(201).send({success:true,message:"token verified"});
        next();
        }
     })
   }catch(error){
     return res.status(500).send({success:false,message:"something went wrong"});
    }
  }
}
module.exports = new Helper();