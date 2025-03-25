const Pages = require("../models/page");
const pageResource = require("../resources/pagesResource");
const pageSchema = require('../requests/pageRequest');
const Page = require("../models/page");
const { uploadImage } = require('../helper/file');

const read = async (req, res) => {
    let query = {};
    const { page = 1, limit = 15, date, search } = req.query;
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

const readPage = async (req, res) => {
    const { id } = req.params;
    try {
        const page = await Pages.findById(id)
            .populate('componentType')
            .populate('industry')
            .populate('stacks')
            .populate('style')
            .populate('type')

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
    const { error, value } = pageSchema(req.body, { abortEarly: false });

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
}

module.exports = {
    createPage: create,
    readPages: read,
    readPage,
    updatePage: update,
    deletePage
}
