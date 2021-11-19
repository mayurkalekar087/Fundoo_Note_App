const noteService = require("../service/note.service");
const { logger } = require("../../logger/logger");
const { validateNote} = require("..//utility/user.validation");

class noteController {
   /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    createNote =(req, res) => {
      try{
        const note = {
          user_id:req.userData.user_id,
          title: req.body.title,
          description: req.body.description
        };
        const valid = validateNote.validate(req.body);
        if (valid.error) {
          logger.error("Invalid Note");
          return res.status(400).send({
            success: false,
            message: "Please enter valid note"
          });
        }
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error("failed to post note");
            return res.status(400).json({
              message: "failed to post note",
              success: false
            });
          }else{
            logger.info("Successfully inserted note");
            return res.status(201).send({
              message: "Successfully inserted note",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      }
    }
     /**
     * @description function written to get all the notes from the database
     * @param {*} req
     * @param {*} res
     * @returns response
     */

    getNote = (req, res) => {
      try {
        noteService.getNote((err, data) => {
          if (err) {
            logger.error("Failed to get all notes");
            return res.status(400).json({
              message: "failed to get note",
              success: false
            });
          } else {
            logger.info("All notes retrived");
            return res.status(200).json({
              message: "Notes retrived successfully",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Error occured while retrieving notes");
        return res.status(500).json({
          message: "Internal Error"
        });
      }
    }
      /**
      * @description function written to get label by ID
      * @param {*} req
      * @param {*} res
      */
    getNoteById = (req, res) => {
      try {
        const id = {
          note_id: req.params.note_id,
          user_id:req.userData.user_id
        };
         noteService.getNoteById(id, (err, data) => {
          if (err) {
            return res.status(401).json({
              message: "Note not found",
              success: false
            });
          } else {
            return res.status(200).json({
              message: "Note retrived succesfully",
              success: true,
              data: data
            });
          }
        });
      } catch (err) {
        return res.status(401).json({
          error: err,
          success: false
        });
      }
    }
    /**
     * @description function written to update notes using ID from the database
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    updateNoteById =(req, res) => {
      try {
        const updateNote = {
          note_id: req.params.note_id,
          user_id: req.userData.user_id,
          title: req.body.title,
          description: req.body.description
        };
        const valid = validateNote.validate(req.body);
        if (valid.error) {
          logger.error("Invalid Note");
          return res.status(400).send({
            success: false,
            message: "Please enter valid note"
          });
        }
        noteService.updateNoteById(updateNote, (error, data) => {
          if (error) {
            logger.error("Note not updated");
            return res.status(400).json({
              message: "Note not updated",
              success: false
            });
          } else {
            logger.info("Successfully note updated");
            return res.status(201).send({
              message: "Successfully note updated",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      }
    }
      /**
   * @description : It is deleting an existing note in fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method: deleteNote from service.js
  */
    deleteNoteById =  (req, res) => {
      try {
        const id = { note_id: req.params.note_id, user_id: req.userData.user_id};
        const data =  noteService.deleteNoteById(id);
        return res.status(200).json({
          message: "Note Deleted succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "Note not updated",
          success: false,
          data: err
        });
      }
    }
}
module.exports = new noteController();