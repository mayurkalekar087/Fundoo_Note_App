const UserService = require("..//service/user.service");

class UserDataController {
  create = (req, res) => {
    console.log("inside controller", req.body);
    try{
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        UserService.registerUser(userData, (err, data) => {
            if (err) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already there, No need to register again'
                });
            } else {
                res.status(201).json({
                success: true,
                message: 'user successfully registered',
                data: data
            });
        }
        });
    }catch (err) {
        return res.status (500).json({
            success: false,
            message: 'Server-Error',
            data: null,
        });
     } 
  }
  login = (req, res) =>  {
    console.log('inside controller', req.body);
    try {
      const loginData = {
        email: req.body.email,
        password: req.body.password,
      };
      UserService.loginUser(loginData, (err, data) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: 'login failed',
            err,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'logged in successfully',
          data
        });
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'server error',
      });
    }
  }
}
module.exports = new UserDataController();