import nodemailer from 'nodemailer';
import {EMAIL_PASS,EMAIL_USER} from '../config/key'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  }
});

const sendResetPasswordEmail = async (user, token) => {
  const base_url = 'https://strikers-barefoot-fe.vercel.app/changepassword';

  const res = await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.dataValues.email,
    subject: 'Strikers-BN-BE Password Reset Link',
    html: `<h1>Strikers-BN-BE Password Reset Link</h1><p>Hi ${`${user.dataValues.firstName} ${user.dataValues.lastName}`} click the link bellow to reset your password</p>
        <p><a href='${`${base_url}?token=${token}`}'>${`${base_url}/${token}`}</a></p>
        <p>It will expires in 30 minutes</p>
        `
  });

  return res;
};

export default sendResetPasswordEmail;
