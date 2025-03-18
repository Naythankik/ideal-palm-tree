const userFactory = require('./src/database/factory/userFactory');
const subscriber = require('./src/database/factory/subscriberFactory');
const universal = require('./src/database/factory/universalFactory');
const pageFactory =  require('./src/database/factory/pageFactory');
const User = require('./src/models/user');
const Component = require('./src/models/component');
const Stack = require('./src/models/stack');
const Style = require('./src/models/style');
const Type = require('./src/models/type');
const Industry = require('./src/models/industry');
const Page = require('./src/models/page');
const Subscriber = require('./src/models/subscriber');
require('dotenv').config();

const connection = require("./config/database");
connection();

const seederUsers = async () => {
    const users = await userFactory();

    try {
        await User.insertMany(users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const seederPages = async () => {
    const pages = await pageFactory()
    try {
        await Page.insertMany(pages);
        process.exit(0);
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
};

const seedUniversal = async () => {
    const universals = [Industry, Component, Stack, Style, Type];
    try{
        for (let model of universals) {
            await model.insertMany(universal);
        }
        process.exit(0);
    }catch(err){
        console.error(err)
        process.exit(1);
    }
}


const seederSubscribers = async () => {
    try {
        await Subscriber.insertMany(subscriber);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};

// seederUsers();
// seederSubscribers()
//
// seedUniversal()
// seederPages();


