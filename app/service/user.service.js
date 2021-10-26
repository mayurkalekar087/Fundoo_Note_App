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
        UserModel.loginUser(loginData, (err, data) => {
            if (err) {
                authenticateUser(err, null);
            }
            if(data) {
                const token = auth.generateToken(data);
                authenticateUser(null, token);
            }else {
                console.log(data);
                authenticateUser(null, data);
            }
        });
    };
}
module.exports = new UserService();