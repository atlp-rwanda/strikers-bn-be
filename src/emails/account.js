const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manzimike378@gmail.com',
    pass: 'bajtkfsqzhnbgtbv' 
  }
});

const mailOptions = {
  from: 'manzimike378@gmail.com',
  to: 'mikemanzi37@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
