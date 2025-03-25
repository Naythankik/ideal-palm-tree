const Joi = require('joi');

const updateIndustrySchema = (data, options = {}) => {
    const industrySchema = Joi.object({
        title: Joi.string(),
        name: Joi.string(),
        description: Joi.string()
    })

    return industrySchema.validate(data, { ...options})
}

module.exports = updateIndustrySchema
