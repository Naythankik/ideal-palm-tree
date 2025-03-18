const express = require("express");
const { login, create, verifyAccount, requestVerification } = require("../src/controllers/authController");
const createMail = require("../src/mails/createMail")
const requestVerificationMail = require("../src/mails/requestVerificationMail");

const router = express.Router();

router.post('/login', login);
router.post('/signup', create, createMail);
router.post('/verify-account/:token', verifyAccount)
router.post('/request-verification', requestVerification, requestVerificationMail)
router.get('/testing', (req, res) => {
    res.json("Working")
})

module.exports = router;
