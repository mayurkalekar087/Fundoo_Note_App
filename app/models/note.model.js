const { logger } = require("../../logger/logger");
const pool = require("..//../config/database.config");
const queries = require("..//queries/user.queries");
require('dotenv').config();

class noteModel {
    createNote = (info, callback) => {
      const values = [info.user_id,info.title,info.description];
      console.log(values);
      pool.query(queries.createNote,values,(err, data) => {
        if (data) {
          console.log(data);
          callback(null, data.rows[0]);
        }else {
          logger.error("error"+ err);
          callback(err.stack, null);
        }
      });
    }
    getNote = (callback) => {
      pool.query(queries.getNote,(err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }
    getNoteById =  (id, callback) => {
      try {
        const values = [id.user_id,id.note_id];
        pool.query(queries.getNoteById,values, (err, data) => {
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
    updateNoteById = (updatedNote, callback) => {
      try {
        const values = [updatedNote.title,updatedNote.description,updatedNote.note_id,updatedNote.user_id];
        pool.query(queries.updateNote,values,(err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } catch (err) {
        return callback(err, null);
      }
    }
    deleteNoteById =  (id) => {
      try {
        const values =[id.note_id,id.user_id];
        pool.query(queries.deleteNote,values,(error,data)=>{
          if(error)
           return (error,null);
           else{
             return (null,data);
           }
        }) 
      } catch (err){
        return err;
      }
    }
  }
module.exports = new noteModel();