const UserModel = require("..//models/user.model");

class UserService {
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
    loginUser = (loginData, authenticateUser) => {
        UserModel.loginUser(loginData, (err, data) => {
            if (err) {
                authenticateUser(err, null);
            } else {
                console.log(data);
                authenticateUser(null, data);
            }
        });
    };
}
module.exports = new UserService();