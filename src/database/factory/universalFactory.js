const { faker } = require('@faker-js/faker');

module.exports = faker.helpers.multiple(() => {
    return {
        name: faker.company.name(),
        title: faker.word.noun(),
        description: faker.lorem.sentence(),
    }
}, {
    count: 10
});
