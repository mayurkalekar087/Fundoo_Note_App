//import controller
const UserDataController = require("../controller/user.controller");

module.exports = (app) => {
    app.post('/register', UserDataController.create);
    //app.post('/login', UserDataController.loginUser);
};