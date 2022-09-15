const Joi = require('joi');

exports.login = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required()
});
