const { faker } = require('@faker-js/faker');

const Component = require("../../models/component");
const Industry = require("../../models/industry");
const Stack = require("../../models/stack");
const Style = require("../../models/style");
const Type = require("../../models/type");

const randomElements = async (model, maxCount = 3) => {
    const result = await model.aggregate([{ $sample: { size: maxCount } }]);
    return result.map(doc => doc);
};

module.exports = async (count) => {
    const pages = [];

    for (let i = 0; i < count; i++) {
        const colorPalette = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.color.rgb());

        const font = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () =>
            faker.helpers.arrayElement(["Arial", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Helvetica", "Georgia"])
        );

        const page = {
            brandName: faker.company.name(),
            brandDescription: faker.lorem.sentences(),
            pageImage: faker.image.url(),
            pageCoverImage: faker.image.url(),
            websiteUrl: faker.internet.url(),
            mode: Math.random() > 0.5 ? "light" : "dark",
            componentType: await randomElements(Component),
            industry: await randomElements(Industry, 3),
            stacks: await randomElements(Stack, 3),
            style: await randomElements(Style, 3),
            type: await randomElements(Type, 3),
            colorPalette,
            font,
        };

        pages.push(page);
    }

    return pages;
};
