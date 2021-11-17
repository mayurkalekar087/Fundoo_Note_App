//import controller
const UserDataController = require("..//controller/user.controller");
const Helper = require("..//utility/user.authenticate");
const noteController = require("../controller/note.controller");

module.exports = (app) => {
    app.post('/register', UserDataController.create);
    app.post('/login', UserDataController.login);
    app.post("/forgotpassword", UserDataController.forgotPassword);
    app.post("/resetpassword",Helper.verifyString, UserDataController.resetPassword);
    app.post("/createnotes", Helper.verifyToken,noteController.createNote);
    app.get("/getnotes", Helper.verifyToken,noteController.getNote);
    app.get("/getnotesbyid/:note_id", Helper.verifyToken, noteController.getNoteById);
    app.put("/updatenotes/:note_id", Helper.verifyToken, noteController.updateNoteById);
    app.delete("/deletenotes/:note_id", Helper.verifyToken, noteController.deleteNoteById);
};