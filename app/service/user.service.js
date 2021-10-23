const UserModel = require("../models/user.model");

class UserService {
    registerUser = (userData,callback) => {
        console.log("inside service");
        UserModel.createDetails(userData, (err,data)=>{
            if (err){
                callback(err,null);
            }else {
                console.log(data);
                callback(null,data);
            }
        });
    };
}
module.exports = new UserService();