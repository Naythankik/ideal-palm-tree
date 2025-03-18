const Joi = require('joi');

const pageSchema = (data, options = {}) => {
    const pageScheme = Joi.object({
        brandName: Joi.string().required(),
        brandDescription: Joi.string().required(),
        websiteUrl: Joi.string().uri().required(),
        mode: Joi.valid('light', 'dark').required(),
        componentType: Joi.array().items(Joi.string()).required(),
        industry: Joi.array().items(Joi.string()).required(),
        stacks: Joi.array().items(Joi.string()).required(),
        style: Joi.array().items(Joi.string()).required(),
        type: Joi.array().items(Joi.string()).required(),
        colorPalette: Joi.string().required()
    })
    return pageScheme.validate(data, { ...options})
}

module.exports = pageSchema
