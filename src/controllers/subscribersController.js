const Subscriber = require("../models/subscriber");
const subscribersResources = require("../resources/subscribersResource");

const read = async (req, res) => {
    const { page = 1, limit = 15, date} = req.query;
    const skip = (page - 1) * limit;

    try {
        const queryDate = date ? {createdAt: { $gte: date } } : {};
        const subscribers = await Subscriber.find(queryDate)
            .skip(skip)
            .limit(limit);

        const totalSubscribers = await Subscriber.countDocuments(queryDate);

        res.status(200).json({
            subscribers: subscribersResources(subscribers),
            totalSubscribers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while fetching subscribers',
        });
    }
}

const create = async (req, res) => {
    return res.status(200).json({
        message: 'Work in progress',
    })
}

module.exports = {
    readSubscriber: read,
    createSubscriber: create,
}
