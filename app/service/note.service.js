const { logger } = require("../../logger/logger");
const noteModel = require("../models/note.model");

class Service {
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
  }
module.exports = new Service();