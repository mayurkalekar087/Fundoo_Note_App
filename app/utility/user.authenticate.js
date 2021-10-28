const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (data)=>{
    const token = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    } 
    return jwt.sign({token}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '30M'});
}