//queries
const loginUser = "SELECT * FROM users where email=$1";
const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";
const updateUser = "UPDATE users SET password = $1 WHERE email= $2";
const resetUser = "UPDATE users SET pw_reset_token = $1 WHERE email = $2";
const createNote = "INSERT INTO notes (user_id,title,description) VALUES($1,$2,$3) RETURNING*"; 

module.exports={
    createUser,
    loginUser,
    updateUser,
    resetUser,
    createNote,
}