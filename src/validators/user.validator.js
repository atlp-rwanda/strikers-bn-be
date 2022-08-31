/* eslint-disable linebreak-style */
import Joi from 'joi';

export const validateUserRegisteration = (body) => {
  const validUserRegisterSchema = Joi.object({
    firstName: Joi.string().max(100).min(2).required(),
    lastName: Joi.string().max(100).min(2).required(),
    email: Joi.string().email().min(5).required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(8).required(),
  });
  return validUserRegisterSchema.validate(body);
}; 

export const validateUserAuthenatication = (body) => {
  const validUserLoginSchema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(8).required()
  });
  return validUserLoginSchema.validate(body);
};
