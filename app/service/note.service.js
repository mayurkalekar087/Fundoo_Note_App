const { logger } = require("../../logger/logger");
const noteModel = require("../models/note.model");

class Service {
   /**
    * @description this function is written to send data models
    * @param {*} A valid notesData is expected
    * @returns error if it has error else data
    */
    createNote = (note, callback) => {
      noteModel.createNote(note, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          console.log(data);
          return callback(null, data);
        }
      });
    }
    getNote = (callback) => {
      noteModel.getNote((err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }
    getNoteById = (id, callback) => {
      try {
         noteModel.getNoteById(id, (err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } catch (err) {
        return err;
      }
    }
    updateNoteById = (updateNote, callback) => {
      noteModel.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
      )
    }
    deleteNoteById =  (id) => {
      try {
        return  noteModel.deleteNoteById(id);
      } catch (err) {
        return err;
      }
    }
  }
module.exports = new Service();