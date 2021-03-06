import Joi from 'joi';

exports.validateRoleRegistration = (body) => {
  const validRoleSchema = Joi.object({
    roleTitle: Joi.string().min(2).max(25).required()
  });
  return validRoleSchema.validate(body);
};
