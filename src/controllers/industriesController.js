const Industry = require("../models/industry");
const industryResources = require("../resources/universalResource");
const industrySchema = require("../requests/universalRequest");
const updateIndustrySchema = require("../requests/updateUniversalRequest");

const create = async (req, res) => {
    const { value, error } = industrySchema(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    try{
        const document = await Industry.create(value);

        return res.status(200).json({
            data: industryResources(document)
        });
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
        const industries = await Industry.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalIndustries = await Industry.countDocuments(queryDate);

        res.status(200).json({
            data: industryResources(industries),
            totalIndustries,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching industries',
        });
    }
}

const readAnIndustry = async (req, res) => {
    const { id } = req.params;
    try {
        const industry = await Industry.findById(id)

        if(!industry){
            return res.status(404).json({
                message: "Industry not found",
            })
        }

        return res.status(200).json({
            page: industryResources(industry),
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            message: 'An error occurred while fetching Industry',
        });
    }
}

const deleteAnIndustry = async (req, res) => {
    const { id } = req.params;

    try {
        const industry = await Industry.findByIdAndDelete(id);

        if(!industry){
            return res.status(404).json({
                message: 'Industry not found',
            })
        }
    }catch (err){
        return res.status(500).json({
            message: 'An error occurred while deleting industry',
        })
    }

    return res.status(200).json({
        message: 'Successfully deleted',
    })
}

const updateAnIndustry = async (req, res) => {
    const { error, value } = updateIndustrySchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details.map(err => err.message) });
    }

    const { id } = req.params;

    try {
        let industry = await Industry.findByIdAndUpdate(id, value);

        if(!industry){
            return res.status(404).json({
                message: 'Industry not found',
            })
        }

        industry = await Industry.findById(id);

        return res.status(200).json(industryResources(industry));
    }catch (err){
        console.error(err)
        return res.status(500).json({
            message: 'An error occurred while updating industry',
        })
    }
}

module.exports = {
    createAnIndustry: create,
    readIndustries: read,
    readAnIndustry,
    deleteAnIndustry,
    updateAnIndustry
}
