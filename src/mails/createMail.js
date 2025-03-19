const sendMail = require("../helper/mailer");
const adminResource = require("../resources/adminResource");
const {createToken} = require("../helper/token");
const User = require("../models/user");

module.exports = async (req, res) => {
    let admin;

    try {
        const { email, id } = req.body;

        const token = await createToken({ email, id }, "15m");

        admin = await User.findById(id);
        admin.verificationToken = token;
        await admin.save();

        const content = 'Welcome to Landing Vault. Click the button below to verify your email address and finish your account.';
        const url = `${process.env.HOSTED_URL}/account-verification/${token}`;

        const htmlBody =`
            <h1>Confirm your email address</h1>
            ${content}<br>
            <span>This link will expire in 10 mins.</span><br><br>
            
            <div style="margin: 2rem 0">
            <a href="${url}" target="_blank" style="padding: 0.5rem 1rem; border-radius: 5px; background: #4242fa; text-decoration: none; color: #ffffff;">Verify Email</a>
            </div>
                       
            If the button doesn't work, copy and paste this link into your browser: <br />
            <a href="${url}">${url}</a> <br><br><br><br>
            
            <p style="text-align: center; margin: 0;">This email was sent by Landing Vault</p><br>
            <p style="text-align: center; margin: 0;">If you didn't request an email verification, please ignore this email.</p>
            `
            await sendMail("Email verification Mail", htmlBody, email);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.status(200).send({
        message: "Account created successfully, Mail has been sent to the provided email!",
        admin: adminResource(admin)
    })
}
