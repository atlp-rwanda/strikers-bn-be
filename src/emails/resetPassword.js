import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Fezafundapp@gmail.com',
    pass: 'rxfpycwnxmmvqqbw',
  }
});

const sendResetPasswordEmail = async (user, token) => {
  const base_url = 'http://localhost:3000';

  const res = await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.dataValues.email,
    subject: 'Strikers-BN-BE Password Reset Link',
    html: `<h1>Strikers-BN-BE Password Reset Link</h1><p>Hi ${`${user.dataValues.firstName} ${user.dataValues.lastName}`} click the link bellow to reset your password</p>
        <p><a href='${`${base_url}/${token}`}'>${`${base_url}/${token}`}</a></p>
        <p>It will expires in 30 minutes</p>
        `
  });

  return res;
};

export default sendResetPasswordEmail;
