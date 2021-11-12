const { logger } = require("../../logger/logger");
const pool = require("..//../config/database.config");
const queries = require("..//queries/user.queries");

class Model {
    createNote = (info, callback) => {
      const values = [info.user_id,info.title,info.description];
      console.log(values);
      pool.query(values,queries.createNote,(err, data) => {
        if (err) {
          console.log("error" + err);
          logger.error("error"+err);
          return callback(err.stack, null);
        } else {
          console.log(data.rows[0]);
          return callback(null, data.rows[0]);
        }
      });
    }

    
    getNote = (callback) => {
      NoteRegister.find({}, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (id, callback) => {
      NoteRegister.find({ userId: id.id }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }
  }
module.exports = new Model();