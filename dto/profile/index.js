const Joi = require('joi');

const createProfileDTO = Joi.object({
  userId: Joi.number().required(),
  bio: Joi.string().required(),
  birthday: Joi.date().required(),
})

module.exports = {
  createProfileDTO
}