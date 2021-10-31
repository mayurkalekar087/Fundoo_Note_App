const queries = require("..//queries/user.queries");
const pool = require("..//../config/database.config");
const { logger } = require("../../logger/logger");

class UserModel {
  /**
     * @description: Adds data to the database
     * @param {*} userDetails
     * @param {*} callback
     */
  createDetails = (userDetails,callback) => {
  const values = [userDetails.firstName,userDetails.lastName,userDetails.email,userDetails.password];
      pool.query(queries.createUser,values,(err,data)=>{
          if(err) {
            logger.error("Find error in model");
             callback(err.stack,null);
          }else
          {
          logger.info("User suucesfully registered");
           console.log(data.rows[0]);
           callback(null,data.rows[0]);
          }
      });
    }
     /**
     * @description: Authenticates user information from the database
     * @param {*} loginData
     * @param {*}  authenticateUser
     */
    loginUser = (loginData, authenticateUser) => {
      const query = [loginData.email];
     
      pool.query(queries.loginUser,query,(err, data) => {
        if (!data) {
          logger.error("Find error while loggin user");
          return authenticateUser("Invalid User", null);
        }
        if (data.rows.length===0) {
          logger.error("Invalid User");
          return authenticateUser("invalid User",null);
        }
        if (data){
            logger.info("Email id found");
            console.log(data.rows[0]);
            return authenticateUser(null, data.rows[0]);
        }
        });
    };
    /**
     * @description:checks if emailId is present inside database
     * @param {*} email
     * @param {*} callback
     */
    forgotPassword = (userDetails, callback) => {
      try {
        const query = [userDetails.email];
        pool.query(queries.loginUser,query, (err, data) => {
          if (err || !data) {
            return callback(err + "invalid email", null);
          } else {
            return callback(null, data);
          }
        });
      } catch (error) {
        logger.error("Internal Error");
        return callback("Internal Error", null);
      }
    }
}
module.exports = new UserModel();