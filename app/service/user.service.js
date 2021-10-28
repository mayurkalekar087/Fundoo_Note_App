const  bcrypt  = require("bcryptjs");
const UserModel = require("..//models/user.model");
const auth = require("..//utility/user.authenticate");

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
                    return authenticateUser(err, null);
                    }
                    else {
                    const result = await bcrypt.compare(loginData.password, data.password)
                    console.log(result);
                    if(result) {
                    const token = auth.generateToken(data);
                    return authenticateUser(null,token);
                    } else {
                    return authenticateUser('Password does not match', null);
                    }
                };
            });
        }
    }
module.exports = new UserService();