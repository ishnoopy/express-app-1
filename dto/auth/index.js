const Joi = require('joi');

const registerDTO = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const loginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

module.exports = {
  registerDTO,
  loginDTO
}