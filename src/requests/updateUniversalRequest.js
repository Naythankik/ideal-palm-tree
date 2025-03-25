const Joi = require('joi');

const updateUniversalSchema = (data, options = {}) => {
    const universalSchema = Joi.object({
        title: Joi.string(),
        name: Joi.string(),
        description: Joi.string()
    })

    return universalSchema.validate(data, { ...options})
}

module.exports = updateUniversalSchema
