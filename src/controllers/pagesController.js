const Pages = require("../models/page");
const pageResource = require("../resources/pagesResource");
const { createPageRequest, updatePageRequest } = require('../requests/pageRequest');
const Page = require("../models/page");
const Component = require("../models/component");
const { uploadImage } = require('../helper/file');

const read = async (req, res) => {
    let query = {};
    const { page = 1, limit = 20, date, search } = req.query;
    const skip = (page - 1) * limit;

    try {
        if(date){
            query.createdAt = { $gte: date };
        }

        if(search){
            query.$or = [
                { brandName: new RegExp(search, 'i') },
                { 'componentType.title': new RegExp(search, 'i') },
                { brandDescription: new RegExp(search, 'i') }
            ];
        }

        const pages = await Pages.find(query)
            .select(['_id', 'brandName', 'pageCoverImage', 'createdAt', 'updatedAt'])
            .populate('componentType', 'title -_id')
            .skip(skip)
            .limit(limit);

        const totalPages = await Pages.countDocuments(query);

        return res.status(200).json({
            subscribers: pageResource(pages),
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalPages / limit),
                totalItems: totalPages,
                itemsPerPage: Number(limit)
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while fetching pages',
        });
    }
}

const readPagesByTitle = async (req, res) => {
    const { page = 1, limit = 20, search } = req.query;

    try {
        let filterQuery = {};
        if(search){
           filterQuery = { title: new RegExp(search, 'i') }
        }

        const component = await Component.find(filterQuery);

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        let query = { componentType: component[0]?._id };

        if(component.length > 1){
            query = {};
        }


        const pages = await Pages.find(query)
            .select(['_id', 'brandName', 'pageCoverImage', 'createdAt', 'updatedAt'])
            .populate('componentType', 'title')
            .populate('industry', 'title')
            .populate('stacks', 'title')
            .populate('style', 'title')
            .populate('type', 'title')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalPages = await Pages.countDocuments(query)

        return res.status(200).json({
            pages: pages.length ? pageResource(pages) : [],
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalPages / limit),
                totalItems: totalPages,
                itemsPerPage: Number(limit)
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while fetching pages',
        });
    }
}

const readAPageByBrandTitle = async (req, res) => {
    const { componentTitle, brandName } = req.params;
    try {
        const component = await Component.findOne({ title: componentTitle });

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        const query = {componentType: component._id, brandName};
        const page = await Pages.find(query)
            .populate('componentType', 'title -_id')
            .populate('industry', 'title -_id')
            .populate('style', 'title -_id')
            .populate('stacks', 'title -_id')
            .populate('type', 'title -_id')

        return res.status(200).json({
            page: page.length ? pageResource(page[0]) : {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while fetching page',
        });
    }
}

const readPage = async (req, res) => {
    const { id } = req.params;
    try {
        const page = await Pages.findById(id)
            .populate('componentType','title -_id')
            .populate('industry','title -_id')
            .populate('stacks','title -_id')
            .populate('style','title -_id')
            .populate('type','title -_id')

        if(!page){
            return res.status(404).json({
                message: "Page not found",
            })
        }

        return res.status(200).json({
            page: pageResource(page),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching pages',
        });
    }
}

const create = async (req, res) => {
    let newPage;
    const { error, value } = createPageRequest(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    value.colorPalette = value.colorPalette.split(',');

    const pageImage = req.files.pageImage ? req.files.pageImage[0] : null;
    const pageCoverImage = req.files.pageCoverImage ? req.files.pageCoverImage[0] : null;

    if (!pageImage || !pageCoverImage) {
        return res.status(422).json({ message: '"pageImage" and "pageCoverImage" are required' });
    }

    try {
        const payload = {
            pageImage: await uploadImage(pageImage.path, value.brandName),
            pageCoverImage: await uploadImage(pageCoverImage.path, value.brandName),
            ...value,
        }

        newPage = new Page(payload);
        await newPage.save();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error processing file uploads', error: error.message });
    }

    return res.status(200).json({
        message: 'Successfully created',
        page: pageResource(newPage),
    })
};

const deletePage = async (req, res) => {
    const { id } = req.params;
    try {
        const page = await Page.findByIdAndDelete(id);

        if(!page){
            return res.status(404).json({
                message: 'Page not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting page',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const update = async (req, res) => {
    const { id } = req.params;

    const { error, value } = updatePageRequest(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    if(value.colorPalette){
        value.colorPalette = value.colorPalette.split(',')
    }

    if (value.componentType) {
        value.componentType = value.componentType.map(item => item.id || item);
    }

    if (value.industry) {
        value.industry = value.industry.map(item => item.id || item);
    }

    if (value.stacks) {
        value.stacks = value.stacks.map(item => item.id || item);
    }

    if (value.style) {
        value.style = value.style.map(item => item.id || item);
    }

    if (value.type) {
        value.type = value.type.map(item => item.id || item);
    }

    const files = req.files;

    if (files.length) {
        for (const image of files) {
            value[image.fieldname] = await uploadImage(image.path, value.brandName ?? 'landing-vault');
        }
    }

    try {
        const page = await Page.findById(id);

        if(!page){
            return res.status(404).json({message: 'Page not found',})
        }

        const payload = {
            ...value
        }

        await page.updateOne(payload);

        return res.status(200).json({
            message: 'Successfully updated',
            page: pageResource(page),
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createPage: create,
    readPage,
    updatePage: update,
    deletePage,
    readPagesByTitle,
    readAPageByBrandTitle
}
