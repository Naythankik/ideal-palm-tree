const Component = require("../models/component");
const Type = require("../models/type");
const Industry = require("../models/industry");
const Stack = require("../models/stack");
const Style = require("../models/style");
const Users = require("../models/user");

const AdminResource = require("../resources/adminResource");


const dashboard = async (req, res) => {
    try {
        const totalComponents = await Component.countDocuments();
        const totalTypes = await Type.countDocuments();
        const totalIndustries = await Industry.countDocuments();
        const totalStacks = await Stack.countDocuments();
        const totalStyles = await Style.countDocuments();
        const totalUsers = await Users.countDocuments({_id: { $ne: req.payload.id }});

        res.status(200).json({
            data: { totalComponents, totalTypes, totalIndustries, totalStacks, totalStyles, totalUsers },
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching subscribers',
        });
    }
}

const readCollection = async (req, res) => {
    const { collection } = req.params;

    try{
        const collectionList = {
            'components': {
                'model' : Component,
                'resource' : null
            },
            'types': {
                'model' : Type,
                'resource' : null
            },
            'users': {
                'model' : Users,
                'resource' : AdminResource
            },
            'industries': {
                'model' : Industry,
                'resource' : null
            },
            'stacks': {
                'model' : Stack,
                'resource' : null,
            },
            'styles': {
                'model' : Style,
                'resource' : null
            }
        }

        const key = collectionList[collection]

        if(!key){
            res.status(422).json({
                message: 'No collection found with this key',
            })
        }

        let collectionData = await key.model.find();

        if(collection === 'users'){
            collectionData = collectionData.filter(user => user._id.toString() !== req.payload.id);
        }

        const responseData = key.resource ? key.resource(collectionData) : collectionData;

        res.status(200).json({
            data: responseData
        })
    }catch (error) {
        res.status(500).json({
            message: `An error occurred while fetching ${collection} data`,
        })
    }
}

module.exports = {
    dashboard,
    readCollection
};
