const { faker } = require('@faker-js/faker')
const bcrypt = require("bcryptjs");

const user = async () => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    return {
        email: faker.internet.email(),
        password: password,
        isVerified: faker.datatype.boolean(),
        role: 'admin',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    }
}

module.exports = async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
        users.push(await user());
    }
    return users
}
