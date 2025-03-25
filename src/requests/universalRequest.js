const Joi = require('joi');

const universalSchema = (data, options = {}) => {
    const universalSchema = Joi.object({
        title: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
    })

    return universalSchema.validate(data, { ...options})
}

module.exports = universalSchema;
