const Joi = require('joi');

const requestVerificationSchema = (data) => {
    return Joi.object({
        email: Joi.string().email().required()
    }).validate(data);
}

module.exports = requestVerificationSchema
