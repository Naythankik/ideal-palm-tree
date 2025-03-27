const express = require("express");
const { login, create, verifyAccount, requestVerification } = require("../src/controllers/authController");
const createMail = require("../src/mails/createMail")
const requestVerificationMail = require("../src/mails/requestVerificationMail");

const router = express.Router();

router.post('/login', login);
router.post('/signup', create);
// router.post('/verify-account/:token', verifyAccount)
// router.post('/request-verification', requestVerification, requestVerificationMail)

module.exports = router;
