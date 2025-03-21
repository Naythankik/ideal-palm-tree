const authRoutes = require("./authenticationRoutes");
const user = require("./user");
const admin = require("./admin");


module.exports = { authRoutes, userRoutes: user, adminRoutes: admin };
