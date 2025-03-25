const Joi = require('joi');

const industrySchema = (data, options = {}) => {
    const industrySchema = Joi.object({
        title: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
    })

    return industrySchema.validate(data, { ...options})
}

module.exports = industrySchema;
