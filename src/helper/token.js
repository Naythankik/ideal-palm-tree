const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = async (token) => {
    return jwt.verify(token, JWT_SECRET);
}

const createToken = async (payload, duration) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: duration
    });
}

module.exports = {
    createToken,
    verifyToken
}
