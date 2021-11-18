const Joi = require('joi');

const authUserRegister  = Joi.object({
firstName: Joi.string().required().pattern(new RegExp('^[A-Za-z]{2,}')),
lastName: Joi.string().required().pattern(new RegExp('[A-Za-z]{2,}')),
email: Joi.string().email().required(),
password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})")),
});

const authUserLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const authUserforgot = Joi.object({
    email: Joi.string().email().required()
  });

  const validateReset = Joi.object({
    random_string: Joi.string().required(),
    password: Joi.string().min(8)
      .pattern(new RegExp("[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}"))
      .required()
  });
  

module.exports = {authUserRegister,authUserLogin,authUserforgot,validateReset};
