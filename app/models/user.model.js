//const pool = require('pg');
const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";
const pool = require("..//../config/database.config");


class UserModel {
   createDetails = (userDetails,callback) => {
   console.log("inside model");
   const values = [userDetails.firstName,userDetails.lastName,userDetails.email,userDetails.password];
       pool.query(createUser,values,(err,data)=>{
           if(err) {
              callback(err.stack,null);
           }else
            {
            console.log(data.rows[0]);
            callback(null,data.rows[0]);
            }
       });
     } 
   }
module.exports = new UserModel();