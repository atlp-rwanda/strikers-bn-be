import Joi from 'joi';

exports.validateTripsNotifications = (body) => {
  const validUserRegisterSchema = Joi.object({
    source: Joi.string().max(100).min(2).required(),
    destination: Joi.string().max(100).min(2).required(),
    DateOfTravel: Joi.date().raw().required(),
    DateOfDestination: Joi.date().raw().required(),
    status: Joi.string().max(100).min(2).required(),

  });
  return validUserRegisterSchema.validate(body);
};
