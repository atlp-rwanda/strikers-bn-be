const Joi = require('joi');

exports.validateRoleRegistration = (body) => {
<<<<<<< HEAD
  const validRoleSchema = Joi.object({
    roleTitle: Joi.string().min(2).max(25).required()
  });
  return validRoleSchema.validate(body);
};
=======
    const validRoleSchema = Joi.object({
        roleTitle: Joi.string().min(2).max(25).required()
    })
    return validRoleSchema.validate(body);
}
>>>>>>> 7dfaed695c40d67e3a94c95117877cbd4f5ee65a
