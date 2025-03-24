const Joi = require('joi');

const componentSchema = (data, options = {}) => {
    const componentSchema = Joi.object({
        title: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
    })

    return componentSchema.validate(data, { ...options})
}

module.exports = componentSchema
