const { faker } = require('@faker-js/faker')

module.exports = faker.helpers.multiple(() => {
    return {
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    }
}, {
    count: 10
});
