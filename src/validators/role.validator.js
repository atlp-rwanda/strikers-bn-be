import Joi from 'joi';

export const validateRoleRegistration = (body) => {
  const validRoleSchema = Joi.object({
    roleTitle: Joi.string().min(2).max(25).required()
  });
  return validRoleSchema.validate(body);
};
