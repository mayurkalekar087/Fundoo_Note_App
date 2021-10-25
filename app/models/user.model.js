const queries = require("..//queries/user.queries");
const pool = require("..//../config/database.config");


class UserModel {
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
    loginUser = (loginData, authenticateUser) => {
      const query = [loginData.email,loginData.password];
      pool.query(queries.loginUser,query,(err, data) => {
        if (data.rows.length===0) {
          return authenticateUser("invalid User");
        }
        else{  
          if (!data) {
          return authenticateUser("Invalid User", null);
        }
        else{
            console.log(data.rows[0]);
            return authenticateUser(null, data.rows[0]);
          }
            }
          });
      };  
  }
module.exports = new UserModel();