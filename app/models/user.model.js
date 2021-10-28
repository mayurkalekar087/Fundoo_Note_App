const queries = require("..//queries/user.queries");
const pool = require("..//../config/database.config");
const { login } = require("../controller/user.controller");

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
             callback(err.stack,null);
          }else
          {
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
          return authenticateUser("Invalid User", null);
        }
        if (data.rows.length===0) {
          return authenticateUser("invalid User",null);
        }
        if (data){
            console.log(data.rows[0]);
            return authenticateUser(null, data.rows[0]);
        }
        });
    };  
}
module.exports = new UserModel();