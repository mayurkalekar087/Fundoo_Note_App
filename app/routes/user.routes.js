//import controller
const userController = require("../controller/user.controller");

module.exports = (app) => {
    app.post('/register', userController.createUser);
};