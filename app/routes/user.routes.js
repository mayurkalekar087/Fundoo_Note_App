//import controller
const UserDataController = require("..//controller/user.controller");
const Helper = require("..//utility/user.authenticate");
const noteController = require("../controller/note.controller");

module.exports = (app) => {
    // registration of user - POST request
    app.post('/register', UserDataController.create);
    // login uses - POST request
    app.post('/login', UserDataController.login);
    // forgot password API - POST request
    app.post("/forgotpassword", UserDataController.forgotPassword);
     // reset user password
    app.post("/resetpassword",Helper.verifyString, UserDataController.resetPassword);
     // notes creation api - POST request
    app.post("/createnotes", Helper.verifyToken,noteController.createNote);
    // get note API -GET request
    app.get("/getnotes", Helper.verifyToken,noteController.getNote);
    // get note by ID API - GET request
    app.get("/getnotesbyid/:note_id", Helper.verifyToken, noteController.getNoteById);
    // update note by ID Api - PUT request
    app.put("/updatenotes/:note_id", Helper.verifyToken, noteController.updateNoteById);
    // delete note by ID Api - DELETE request
    app.delete("/deletenotes/:note_id", Helper.verifyToken, noteController.deleteNoteById);
};