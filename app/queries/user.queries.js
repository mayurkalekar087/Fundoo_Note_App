const loginUser = "SELECT * FROM users where email=$1 AND password=$2";
const createUser = "INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *";

module.exports={
    createUser,
    loginUser,
}