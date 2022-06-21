const Joi = require("joi");

exports.validateBookingRegistration = (body) => {
  const bookingSchema = Joi.object({
    supplierId: Joi.number().min(1).required(),
    requesterId: Joi.number().min(1).required(),
    status: Joi.string().valid("pending", "confirmed", "cancelled").required(),
    dateSubmitted: Joi.date().required(),
  });
  return bookingSchema.validate(body);
};
