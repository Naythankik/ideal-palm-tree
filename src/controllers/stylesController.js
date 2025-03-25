const Style = require("../models/style");
const styleResources = require("../resources/universalResource");
const styleSchema = require("../requests/universalRequest");
const updateStyleSchema = require("../requests/updateUniversalRequest");

const create = async (req, res) => {
    const { value, error } = styleSchema(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const document = await Style.create(value);
        return res.status(200).json(styleResources(document));
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
        const styles = await Style.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalStyles = await Style.countDocuments(queryDate);

        res.status(200).json({
            data: styleResources(styles),
            totalStyles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching styles',
        });
    }
}

const readAStyle = async (req, res) => {
    const { id } = req.params;
    try {
        const style = await Style.findById(id)

        if(!style){
            return res.status(404).json({
                message: "Style not found",
            })
        }

        return res.status(200).json({
            page: styleResources(style),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching style',
        });
    }
}

const deleteAStyle = async (req, res) => {
    const { id } = req.params;

    try {
        const style = await Style.findByIdAndDelete(id);

        if(!style){
            return res.status(404).json({
                message: 'Style not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting style',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const updateAStyle = async (req, res) => {
    const { error, value } = updateStyleSchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.params;

    try {
        let style = await Style.findByIdAndUpdate(id, value);

        if(!style){
            return res.status(404).json({
                message: 'Style not found',
            })
        }

        style = await style.findById(id);

        return res.status(200).json(styleResources(style));
    }catch (err){
        console.error(err)
        return res.status(500).json({
            message: 'An error occurred while updating style',
        })
    }
}

module.exports = {
    createAStyle: create,
    readStyles: read,
    readAStyle,
    deleteAStyle,
    updateAStyle
}
