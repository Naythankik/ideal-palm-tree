const { verifyToken, createToken } = require("../helper/token");

const authentication = async (req, res, next) => {
    const {
        headers: { authorization },
    } = req;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).send({ message: "Unauthorized request: No Bearer token" });
    }

    const token = authorization.substring(7);

    try {
        const { email, id, exp } = await verifyToken(token);

        const now = Date.now().valueOf() / 1000;

        if (exp < now) {
            return res.status(401).send({ message: "Token expired, please login again" });
        }

        const gracePeriod = 5 * 60;
        if (exp - now <= gracePeriod) {
            const newToken = await createToken({ email, id }, "2h");

            res.cookie("token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "Strict",
            });
        }

        req.payload ={
            email,
            id
        }
        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired, please login again" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(400).send({ message: "Invalid token, please login again" });
        }

        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
};


module.exports = authentication;
