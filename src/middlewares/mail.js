import nodemailer from 'nodemailer';
import { email, password } from "../config/key";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
});

export default transporter;