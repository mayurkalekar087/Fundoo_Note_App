//import controller
const UserDataController = require("..//controller/user.controller");
const Helper = require("..//utility/user.authenticate");
const noteController = require("../controller/note.controller");
const auth = require("..//utility/user.nodemailer");

module.exports = (app) => {
    app.post('/register', UserDataController.create);
    app.post('/login', UserDataController.login);
    app.post("/forgotpassword", UserDataController.forgotPassword);
    app.post("/resetpassword",Helper.verifyToken, UserDataController.resetPassword);
    app.post("/createnotes", noteController.createNote);
    app.get("/getnotes",  noteController.getNote);
};