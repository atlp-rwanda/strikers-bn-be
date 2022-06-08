import _ from "lodash";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { validateUserRegisteration } from "../validators/user.validator";
import { TOKEN_SECRET,email,base_url } from "../config/key";
import transporter from '../middlewares/mail';

dotenv.config();

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    const validateUserInput = validateUserRegisteration(user);

    if (validateUserInput.error) {
      return res.status(400).json(validateUserInput.error.details[0].message);
    }

    const duplicateEmail = await User.findOne({ where: { email: user.email } });
    if (duplicateEmail) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "This email address has already been used!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.verificationToken = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      TOKEN_SECRET,
      { expiresIn: "365d" }
    );
    // }, process.env.TOKEN_SECRET, { expiresIn: '365d' });

    const newUser = await User.create(
      _.pick(user, [
        "firstname",
        "lastname",
        "email",
        "roleId",
        "phoneNumber",
        "password",
        "verificationToken",
      ])
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Account created. Please verify via email!",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    let token = jwt.sign(
      {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
      },
      TOKEN_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({ token, user });
  } catch (error) {
    res.status(404);
    res.send(error.toString());
  }
};

exports.resetPasswordLink = async(req,res)=>{
  try{
    let all = await User.findAll({where: {}})
    console.log(all)
    // let user = await User.findOne({ where: { email: req.body.email } });
return res.send(all)

    // if(!user)
    //   return res.status(401).send({message: "User with such email does not exists"});

    //   let token = jwt.sign(
    //     {
    //       id: user.id,
    //       email: user.email,
    //     },
    //     TOKEN_SECRET,
    //     {
    //       expiresIn: 1800, // 30 minutes
    //     }
    //   );

    //   var mailOptions = {
    //     from: email,
    //     to: user.email,
    //     subject: 'Strikers-BN-BE Password Reset Link',
    //     html: `<h1>Strikers-BN-BE Password Reset Link</h1><p>Hi ${user.firstname + " "+ user.lastname} click the link bellow to reset your password</p>
    //     <p><a href='${base_url+"/"+token}'>${base_url+"/"+token}</a></p>
    //     <p>It will expires in 30 minutes</p>
    //     `
    //   };
      
    //   transporter.sendMail(mailOptions, async function(error, info){
    //     if (error) {
    //       console.log(error);
    //       return res.status(400).send(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);

    //       await User.update({
    //         passwordResetToken: token
    //       }, {where: {id: user.id}});
  
    //       return res.status(200).send({messageSuccess: "Email was sent successfully, it will expires in 30 minutes"})
    //     }
    //   });
    
  }
  catch (error) {
    res.status(404);
    res.send(error.toString());
  }
}

exports.newPassword = async(req,res)=>{
  try{
    let {token, newPassword} = req.body;

    try{
      jwt.verify(token,TOKEN_SECRET, async(err, decoded) => {
        if (err) 
        return res.status(401).send({ message: "Invalid Token"});

        let reset = await User.update({
        password: newPassword
        }, {where: {passwordResetToken: token,id: decoded?.id,email: decoded?.email}});

        if(reset)
        return res.send("Password has been changed successfully");
        else
        return res.send("User with this token does not exists");

      });
    }
    catch {
      return res.status(403).send({ message: "No token provided!" });
    }

  }
  catch (error) {
    res.status(404);
    res.send(error.toString());
  }
}