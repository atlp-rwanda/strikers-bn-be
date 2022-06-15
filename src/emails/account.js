"use strict";
import nodemailer from "nodemailer";

exports.sendEmail = async (firstName, lastName, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    to: email,
    subject: "Verify your account",
    text: `Hello ${firstName} ${lastName},\n\n
        Thanks for signing up on Barefoot Nomad.\n\n
        Please click on the link below to verify your email address.\n\n
        http://localhost:8001/api/v1/user/verify/${email}`,
  });
};
