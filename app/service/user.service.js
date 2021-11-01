const  bcrypt  = require("bcryptjs");
const UserModel = require("..//models/user.model");
const Helper = require("..//utility/user.authenticate");
const { logger } = require("../../logger/logger");
const mailUser = require("..//utility/user.nodemailer");

class UserService {
      /**
     * @description: Function sends new user info to model
     * @param {*} userData
     * @param {*} callback
     */
    registerUser = (userData,callback) => {
        UserModel.createDetails(userData, (err,data)=>{
            if (err){
                callback(err,null);
            }else {
                console.log(data);
                callback(null,data);
            }
        });
    };
     /**
     * @description: Function gets data from model, whether it is valid or not.
     * @param {*} loginData
     * @param {*} authenticateUser
     */
        loginUser = (loginData, authenticateUser) => {
        UserModel.loginUser(loginData,async (err, data) => {
                    if (err) {
                    logger.error("Error found in service");
                    return authenticateUser(err, null);
                    }
                    else {
                    const result = await bcrypt.compare(loginData.password, data.password)
                    console.log(result);
                    if(result) {
                    const token = Helper.jwtTokenGenerate(data);
                    logger.info("Valid Password");
                    return authenticateUser(null,token);
                    } else {
                    logger.error("Password does not match");
                    return authenticateUser('Password does not match', null);
                    }
                };
            });
        }
        forgotPassword = (user, callback) => {
            UserModel.forgotPassword(user, (err, data) => {
              if (err || !data) {
                return callback(err, null);
              } else {
                const token = Helper.jwtTokenGenerate(data);
                return callback(null,mailUser.sendEmail(token));
            }
          });
        }
    }
module.exports = new UserService();