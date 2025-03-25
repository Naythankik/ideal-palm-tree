const Type = require("../models/type");
const typeResources = require("../resources/universalResource");
const typeSchema = require("../requests/universalRequest");
const updateTypeSchema = require("../requests/updateUniversalRequest");

const create = async (req, res) => {
    const { value, error } = typeSchema(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const document = await Type.create(value);
        return res.status(200).json(typeResources(document));
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: error.details.map(err => err.message) });
    }
}

const read = async (req, res) => {
    const { page = 1, limit = 15, date} = req.query;
    const skip = (page - 1) * limit;

    try {
        const queryDate = date ? {createdAt: { $gte: date } } : {};
        const types = await Type.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalTypes = await Type.countDocuments(queryDate);

        res.status(200).json({
            data: typeResources(types),
            totalTypes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching types',
        });
    }
}

const readAType = async (req, res) => {
    const { id } = req.params;
    try {
        const type = await Type.findById(id)

        if(!type){
            return res.status(404).json({
                message: "Type not found",
            })
        }

        return res.status(200).json({
            page: typeResources(type),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching type',
        });
    }
}

const deleteAType = async (req, res) => {
    const { id } = req.params;

    try {
        const type = await Type.findByIdAndDelete(id);

        if(!type){
            return res.status(404).json({
                message: 'Type not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting type',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const updateAType = async (req, res) => {
    const { error, value } = updateTypeSchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.params;

    try {
        let type = await Type.findByIdAndUpdate(id, value);

        if(!type){
            return res.status(404).json({
                message: 'Type not found',
            })
        }

        type = await Type.findById(id);

        return res.status(200).json(typeResources(type));
    }catch (err){
        console.error(err)
        return res.status(500).json({
            message: 'An error occurred while updating type',
        })
    }
}

module.exports = {
    createAType: create,
    readTypes: read,
    readAType,
    deleteAType,
    updateAType
}
