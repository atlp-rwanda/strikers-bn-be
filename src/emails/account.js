"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async (firstName, lastName, email) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manzimike378@gmail.com',
            pass: 'bajtkfsqzhnbgtbv'
        }
    });
    await transporter.sendMail({
        to: email,
        subject: "Verify your account",
        text: `Hello ${firstName} ${lastName},\n\nThanks for signing up on Barefoot Nomad.\n\nPlease click on the link below to verify your email address.\n\n http://localhost:8001/verify/${email}`,
    });
}