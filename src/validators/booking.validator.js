import Joi from 'joi';

export const validateBookingRegistration = (body) => {
  const bookingSchema = Joi.object({
    supplierId: Joi.string().min(10).max(100).required(),
    accomodationId: Joi.string().min(10).max(100).required(),
    roomId: Joi.string().min(10).max(100).required(),
    requesterId: Joi.string().min(10).max(100).required(),
    startDate: Joi.date().raw().required(),
    endDate: Joi.date().raw().required()
  });
  return bookingSchema.validate(body);
};
