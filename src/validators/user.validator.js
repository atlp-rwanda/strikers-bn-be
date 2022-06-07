/* eslint-disable linebreak-style */
const Joi = require("joi");

exports.validateUserRegisteration = (body) => {
  const validUserRegisterSchema = Joi.object({
    firstname: Joi.string().max(100).min(2).required(),
    lastname: Joi.string().max(100).min(2).required(),
    email: Joi.string().email().min(5).required(),
    roleId: Joi.string().required(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string().min(8).required(),
  });
  return validUserRegisterSchema.validate(body);
};
