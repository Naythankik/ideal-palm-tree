const { faker } = require('@faker-js/faker');

const Component = require("../../models/component");
const Industry = require("../../models/industry");
const Stack = require("../../models/stack");
const Style = require("../../models/style");
const Type = require("../../models/type");

const randomObjectId = async (model) => {
    const result = await model.aggregate([{ $sample: { size: 1 } }]);
    return result[0]?._id;};

module.exports = async () => {
    const pages = [];


    for (let i = 0; i < 10; i++) {

        let arr = [];
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            arr.push(faker.color.rgb());
        }

        const page = {
            brandName: faker.company.name(),
            brandDescription: faker.lorem.sentences(),
            pageImage: faker.image.url(),
            pageCoverImage: faker.image.url(),
            websiteUrl: faker.internet.url(),
            mode: Math.random() > 0.5 ? "light" : "dark",
            componentType: await randomObjectId(Component),
            industry: await randomObjectId(Industry),
            stacks: await randomObjectId(Stack),
            style: await randomObjectId(Style),
            type: await randomObjectId(Type),
            colorPalette: arr
        };
        pages.push(page);
    }
    return pages
};
