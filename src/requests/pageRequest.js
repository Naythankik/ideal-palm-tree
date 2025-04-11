const Joi = require('joi');

const createPageRequest = (data, options = {}) => {
    const pageScheme = Joi.object({
        brandName: Joi.string().required(),
        brandDescription: Joi.string().required(),
        websiteUrl: Joi.string().uri().required(),
        pageImage: Joi.string().uri().optional(),
        pageCoverImage: Joi.string().uri().optional(),
        mode: Joi.valid('light', 'dark').required(),
        componentType: Joi.array().items(Joi.object({
            id: Joi.string().required()
        })).required(),
        industry: Joi.array().items(Joi.object({
            id: Joi.string().required()
        })).required(),
        stacks: Joi.array().items(Joi.object({
            id: Joi.string().required()
        })).required(),
        style: Joi.array().items(Joi.object({
            id: Joi.string().required()
        })).required(),
        type: Joi.array().items(Joi.object({
            id: Joi.string().required()
        })).required(),
        colorPalette: Joi.string().required(),
        font: Joi.string().optional()
    })
    return pageScheme.validate(data, { ...options})
}

const updatePageRequest = (data, options = {}) => {
    const pageScheme = Joi.object({
        brandName: Joi.string().optional(),
        brandDescription: Joi.string().optional(),
        websiteUrl: Joi.string().uri().optional(),
        mode: Joi.valid('light', 'dark').optional(),
        componentType: Joi.array().items(Joi.object({
            id: Joi.string().optional()
        })).optional(),
        industry: Joi.array().items(Joi.object({
            id: Joi.string().optional()
        })).optional(),
        stacks: Joi.array().items(Joi.object({
            id: Joi.string().optional()
        })).optional(),
        style: Joi.array().items(Joi.object({
            id: Joi.string().optional()
        })).optional(),
        type: Joi.array().items(Joi.object({
            id: Joi.string().optional()
        })).optional(),
        colorPalette: Joi.string().optional(),
        font: Joi.string().optional()
    })
    return pageScheme.validate(data, { ...options})
}

module.exports = {
    createPageRequest,
    updatePageRequest
}
