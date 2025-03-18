require('dotenv').config();
const nodemailer = require("nodemailer")

const sendMail = async (subject, body, email) => {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        async function main() {
            await transporter.sendMail({
                from: `Landing Vault ${process.env.MAIL_USERNAME}`,
                to: email,
                subject: subject,
                html: body
            });

        }
        main().catch(console.error)
}

module.exports = sendMail
