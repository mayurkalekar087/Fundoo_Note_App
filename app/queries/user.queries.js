//queries
const loginUser = "SELECT * FROM users where email=$1";
const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";
const updateUser = "UPDATE users SET password = $1 WHERE email= $2";
const resetUser = "UPDATE expire_table1 SET random_string = $1 WHERE email = $2";
const createNote = "INSERT INTO notes2 (user_id,title,description) VALUES ($1,$2,$3) RETURNING *";
const verifyString = "select random_string from expire_table1 where email=$1";
const getNote =    "select * from notes2";
const getNoteById = "select * from notes2 where note_id=$1";
const updateNote = "UPDATE notes2 SET title = $1, description=$2 WHERE note_id = $3 RETURNING*";
const deleteNote = "DELETE FROM notes2 WHERE note_id = $1";

module.exports={
    createUser,
    loginUser,
    updateUser,
    resetUser,
    createNote,
    verifyString,
    getNote,
    getNoteById,
    updateNote,
    deleteNote,
};