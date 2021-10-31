const nodemailer = require('nodemailer');
require('dotenv').config
const Helper = require('..//utility/user.authenticate');
const { logger } = require("../../logger/logger");

exports.sendEmail = (data) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    logger.info("Jwt Token Generate");
    const token = Helper.jwtTokenGenerate(data);
    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: "Reset password Link",
      html: `<h2>please click on this link to change the password</h2>
                  <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                  `
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return null;
      } else {
        const data = {
          link: process.env.CLIENT_URL + "/resetpassword/" + token,
          response: info.response
        };
        return data;
      }
    });
  };