require("dotenv").config();
const loginSchema = require("../requests/loginRequest");
const requestVerificationSchema = require("../requests/requestVerificationRequest");
const User = require("../models/user");
const adminResource = require("../resources/adminResource");
const { verifyToken, createToken} = require("../helper/token");

const login = async (req, res) => {
    const validation = loginSchema(req.body);

    const { error, value } = validation;
    if (error) {
        return res.status(422).json({ success: false, message: error.details[0].message });
    }

    try {
        const {email, password} = value;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials, Try again!" });
        }

        const doesPasswordMatch = await user.comparePassword(password);
        if (!doesPasswordMatch) {
            return res.status(401).send({
                success: false,
                error: "Invalid credentials, Try again!",
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: "User account has not been verified" });
        }

        user.password = undefined;

        const token = await createToken({ email: user.email, id: user._id }, "2h");

        res.status(200).send({
            admin: adminResource(user),
            access_token : token
        });
    }catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};

const create = async (req, res, next) => {
    try {
        const { error, value } = loginSchema(req.body);
        if (error) {
            res.status(422).send({error: error.details[0].message,});
            return;
        }
        const user = await User.findOne({email: value.email})

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User(value);
        await newUser.save();
        req.body.id = newUser._id;
    } catch (err) {
        console.error(error);
        res.status(500).send({
            message: err.message,
        });
    }
    next();
}

const verifyAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const { email } = await verifyToken(token);

        const admin = await User.findOne({verificationToken: token});

        if (!admin) {
            return res.status(400).json({ message: "Token is invalid" });
        }

        if(admin.email !== email) {
            res.status(403).json({ message: "Invalid credentials, Try again!", });
        }

        admin.isVerified = true;
        admin.verificationToken = undefined;

        await admin.save();
        res.status(200).json({
            admin: adminResource(admin)
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
}

const requestVerification = async (req, res, next) => {
    const {error, value} = requestVerificationSchema(req.body);

    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }

    try {
        const { email } = value;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).send("Admin not found, Try again!");
        }

        if (user.isVerified) {
            return res.status(401).send({message: "User account has been verified"});
        }

        req.body.id = user._id
        next();
    }catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    login,
    create,
    verifyAccount,
    requestVerification,
};
