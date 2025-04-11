const userFactory = require('./src/database/factory/userFactory');
const subscriber = require('./src/database/factory/subscriberFactory');
const universal = require('./src/database/factory/universalFactory');
const pageFactory = require('./src/database/factory/pageFactory');
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

// Seeder functions
const seederUsers = async () => {
    const users = await userFactory();
    try {
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
        throw err;
    }
};

const seedUniversal = async () => {
    const universals = [Industry, Component, Stack, Style, Type];
    try {
        for (let model of universals) {
            await model.insertMany(universal);
            console.log(`${model.modelName} seeded successfully`);
        }
    } catch (err) {
        console.error('Error seeding universal models:', err);
        throw err;
    }
};

const seederSubscribers = async () => {
    try {
        await Subscriber.insertMany(subscriber);
        console.log('Subscribers seeded successfully');
    } catch (err) {
        console.error('Error seeding subscribers:', err);
        throw err;
    }
};

const seederPages = async () => {
    const pages = await pageFactory(200);
    try {
        await Page.insertMany(pages);
        console.log('Pages seeded successfully');
    } catch (err) {
        console.error('Error seeding pages:', err);
        throw err;
    }
};

// Run seeders sequentially
const runSeeders = async () => {
    try {
        await seederUsers();
        await seederSubscribers();
        await seedUniversal();
        await seederPages();
        console.log('All seeders completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeder error:', err);
        process.exit(1);
    }
};

runSeeders();
