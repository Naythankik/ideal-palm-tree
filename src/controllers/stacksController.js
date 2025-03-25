const Stack = require("../models/stack");
const stackResources = require("../resources/universalResource");
const stackSchema = require("../requests/universalRequest");
const updateStackSchema = require("../requests/updateUniversalRequest");

const create = async (req, res) => {
    const { value, error } = stackSchema(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const document = await Stack.create(value);
        return res.status(200).json(stackResources(document));
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
        const stacks = await Stack.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalStacks = await Stack.countDocuments(queryDate);

        res.status(200).json({
            data: stackResources(stacks),
            totalStacks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching stacks',
        });
    }
}

const readAStack = async (req, res) => {
    const { id } = req.params;
    try {
        const stack = await Stack.findById(id)

        if(!stack){
            return res.status(404).json({
                message: "Stack not found",
            })
        }

        return res.status(200).json({
            page: stackResources(stack),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching stack',
        });
    }
}

const deleteAStack = async (req, res) => {
    const { id } = req.params;

    try {
        const stack = await Stack.findByIdAndDelete(id);

        if(!stack){
            return res.status(404).json({
                message: 'Stack not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting stack',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const updateAStack = async (req, res) => {
    const { error, value } = updateStackSchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.params;

    try {
        let stack = await Stack.findByIdAndUpdate(id, value);

        if(!stack){
            return res.status(404).json({
                message: 'Stack not found',
            })
        }

        stack = await Stack.findById(id);

        return res.status(200).json(stackResources(stack));
    }catch (err){
        console.error(err)
        return res.status(500).json({
            message: 'An error occurred while updating stack',
        })
    }
}

module.exports = {
    createAStack: create,
    readStacks: read,
    readAStack,
    deleteAStack,
    updateAStack
}
