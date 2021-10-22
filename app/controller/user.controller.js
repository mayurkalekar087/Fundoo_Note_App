const models = require("../models/user.model");
const pool = require("..//../config/database.config");
const bcrypt = require("bcrypt");

  class UserDataController {
    
  createUser = (async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const user = await pool.query(models.checkIfEmailExists, [email]);
  
      if (user.rows.length !== 0) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(models.createUser,[name, email, bcryptPassword]
      );
        res.json(newUser.rows[0]);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

   loginUser = (async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await pool.query(models.checkIfEmailExists, [email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Password or Email is Incorrect!");
      }
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
      if (!validPassword) {
        return res.status(401).json("Invalid");
      }
    res.json(user.rows[0]);  
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
  }
module.exports= new UserDataController();