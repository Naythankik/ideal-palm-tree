const Joi = require('joi');

const updateComponentSchema = (data, options = {}) => {
    const componentSchema = Joi.object({
        title: Joi.string(),
        name: Joi.string(),
        description: Joi.string()
    })

    return componentSchema.validate(data, { ...options})
}

module.exports = updateComponentSchema
