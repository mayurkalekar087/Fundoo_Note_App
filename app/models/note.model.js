const { logger } = require("../../logger/logger");
const pool = require("..//../config/database.config");
const queries = require("..//queries/user.queries");

class Model {
    createNote = (info, callback) => {
      const values = [info.user_id,info.title,info.description];
      console.log(values);
      pool.query(values,queries.createNote,(error, data) => {
        if (error) {
          logger.error(error);
          return callback(error.stack, null);
        } else {
          console.log(data.rows[0]);
          return callback(null, data.rows[0]);
        }
      });
    }
  }
module.exports = new Model();