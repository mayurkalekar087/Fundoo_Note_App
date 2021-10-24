const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";
const loginUser = "SELECT * FROM users WHERE email=$1 AND password=$2";
const checkIfEmailExists = "SELECT * FROM users WHERE email=$1";
const pool = require("..//../config/database.config");
const bcrypt = require('bcrypt');

class UserModel {
   createDetails = (async (userDetails,callback) => {
   console.log("inside model");

   const query = [userDetails.email];
   pool.query(checkIfEmailExists,query,(err,data)=>{
    if (data.rows.length) {
      callback("Email already exists");
    }

    const saltRound = 10;
    const salt =  bcrypt.genSalt(saltRound);
    bcryptPassword = bcrypt.hash(password, salt);

    const query = [userDetails.firstName,userDetails.lastName,userDetails.email,userDetails.bcryptPassword];
   pool.query(createUser,query,(err,data)=>{
       if(err) {
          callback(err.stack,null);
       }else
        {
        console.log(data.rows[0]);
        callback(null,data.rows[0]);
        }
   });
  });
});
  loginUser = (loginData, authenticateUser) => {
      console.log('inside model');
      const query = [loginData.email,loginData.password];
      pool.query(loginUser,query,(err, data) => {
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
  };
module.exports = new UserModel();