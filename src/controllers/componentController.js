const Component = require("../models/component");
const componentResources = require("../resources/universalResource");
const componentSchema = require("../requests/universalRequest");
const updateComponentSchema = require("../requests/updateUniversalRequest");

const create = async (req, res) => {
    const { value, error } = componentSchema(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const document = await Component.create(value);
        return res.status(200).json(componentResources(document));
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
        const components = await Component.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalComponent = await Component.countDocuments(queryDate);

        res.status(200).json({
            data: componentResources(components),
            totalComponent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching subscribers',
        });
    }
}

const readAComponent = async (req, res) => {
    const { id } = req.params;
    try {
        const component = await Component.findById(id)

        if(!component){
            return res.status(404).json({
                message: "Component not found",
            })
        }

        return res.status(200).json({
            page: componentResources(component),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching components',
        });
    }
}

const deleteAComponent = async (req, res) => {
    const { id } = req.params;
    try {
        const component = await Component.findByIdAndDelete(id);

        if(!component){
            return res.status(404).json({
                message: 'Component not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting component',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const updateAComponent = async (req, res) => {
    const { error, value } = updateComponentSchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.params;

    try {
        let component = await Component.findByIdAndUpdate(id, value);

        if(!component){
            return res.status(404).json({
                message: 'Component not found',
            })
        }

        component = await Component.findById(id);

        return res.status(200).json(componentResources(component));
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while updating component',
        })
    }
}

module.exports = {
    createAComponent: create,
    readComponents: read,
    readAComponent,
    deleteAComponent,
    updateAComponent
}
