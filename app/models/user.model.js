
const createUser = "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *";
const checkIfEmailExists="SELECT * FROM users WHERE user_email = $1";

module.exports = {
    createUser,
    checkIfEmailExists,
};


