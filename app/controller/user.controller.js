const UserService = require("..//service/user.service");
const {authUserRegister,authUserLogin,authUserforgot,validateReset} = require("..//utility/user.validation");
const {genSaltSync,hashSync} = require('bcrypt');
const { logger } = require("../../logger/logger");

class UserDataController {
   /**
     * @description : Function created to add user into database
     * @param {*} req
     * @param {*} res
     * @returns
     */
  create = (req, res) => {
    try{
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        const salt = genSaltSync(10);
        userData.password = hashSync(req.body.password,salt);
       
        const registerValidation = authUserRegister.validate(userData);
            if(registerValidation.error) {
                res.status(400).send({
                    success: false,
                    message: "Enter valid fields",
                    data: registerValidation
                });
                logger.error("Invalid Details");
                return;
            }
        UserService.registerUser(userData, (err, data) => {
            if (err) {
                return res.status(201).json({
                    success: false,
                    message: 'User allready exist'
                });
            } else {
                logger.info("User registered");
                res.status(201).json({
                success: true,
                message: 'user successfully registered',
                data: data
            });
          }
        });
    }catch (err) {
      logger.error("Internal server error");
        return res.status (500).json({
            success: false,
            message: 'Server-Error',
            data: null,
        });
     }
}
 /**
     * @description: Function created to verify user login info
     * @param {*} req
     * @param {*} res
     */
login = (req, res) =>  {
  console.log('inside controller', req.body);
  try {
    const loginData = {
      email: req.body.email,
      password: req.body.password,
    };
    const loginValidation = authUserLogin.validate(loginData);
          if (loginValidation.error){
              res.status(400).send({
                  success: false,
                  message: 'check inserted fields',
                  data: loginValidation
              });
              return;
        };
    UserService.loginUser(loginData,(err, data) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'login failed',
          err,
        });
      }
      if(data){
      return res.status(200).send({
        success: true,
        message: 'logged in successfully',
        token: data
      });
    }
    });
    }catch (err) {
    return res.status(500).send({
      success: false,
      message: 'server error',
    });
  }
}
/**
     * @description : forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */
forgotPassword = (req, res) => {
  try {
      const user = {
      email: req.body.email
    };
    const emailValidation = authUserforgot.validate(user);
    if (emailValidation.error) {
      res.status(400).send({
        success: false,
        message: "check inserted fields",
        data: emailValidation
      });
      return;
    }
    UserService.forgotPassword(user, (error, data) => {
      if (error) {
          logger.error("email id is not exist");
            return res.status(409).json({
              success: false,
              message: "email id is not exist"
            });
          } else {
            logger.info("email send Successfully");
            res.status(201).json({
              success: true,
              token:data,
              message: "email send successfully"
              });
            }
        });
      } catch (error) {
        logger.error("server-error");
        return res.status(500).json({
          success: false,
          data: null,
          message: "server-error"
       });
    }
  };   
/**
     * @description:calls service layer to reset password
     * @param {*} req
     * @param {*} res
     * @returns
     */
 resetPassword = (req, res) => {
  try {
    const resetInfo = {
      email: req.userData.email,
      id: req.userData.id,
      newPassword: req.body.password
    };
    const resetVlaidation = validateReset.validate(resetInfo);
      if (resetVlaidation.error) {
        logger.error("Invalid password");
        res.status(400).send({
          success: false,
          message: "Invalid password"
        });
        return;
      }
    UserService.resetPassword(resetInfo, (error, data) => {
      if (data) {
          logger.info("Password reset successfully");
          return res.status(200).json({
          success: true,
          message: "Password reset successfully"
        });
      } else {
          logger.error(error);
          return res.status(401).json({
          success: false,
          message: error
        });
      }
    });
  }catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: "server-error"
    });
  }
}
}
module.exports = new UserDataController();