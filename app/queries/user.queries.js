//queries
const loginUser = "SELECT * FROM users where email=$1";
const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";
const updateUser = "UPDATE users SET password = $1 WHERE email= $2";
const resetUser = "UPDATE expire_table1 SET random_string = $1 WHERE email = $2";
const createNote = "INSERT INTO note (user_id,title,description) VALUES ($1,$2,$3) RETURNING *";
const verifyString = "select random_string from expire_table1 where email=$1";
const getNote =    "select * from note ";

module.exports={
    createUser,
    loginUser,
    updateUser,
    resetUser,
    createNote,
    verifyString,
    getNote,
};