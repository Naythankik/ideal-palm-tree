require('dotenv').config();
const nodemailer = require("nodemailer")

const sendMail = async (subject, body, email) => {
       try{
           let transporter = nodemailer.createTransport({
               host: process.env.MAIL_HOST,
               port: process.env.MAIL_PORT,
               secure: true,
               auth: {
                   user: process.env.MAIL_USERNAME,
                   pass: process.env.MAIL_PASSWORD,
               },
               debug: process.env.NODE_ENV !== 'production',
               connectionTimeout: 10000,
               greetingTimeout: 10000,
               sendTimeout: 30000
           });

          const info =  await transporter.sendMail({
               from: `Landing Vault <${process.env.MAIL_USERNAME}>`,
               to: email,
               subject: subject,
               html: body
           });

           console.log("Message sent: %s", info.messageId);
           return info;
       }catch (e){
           console.error("Error occurred while sending email:", e);
       }
}

module.exports = sendMail
