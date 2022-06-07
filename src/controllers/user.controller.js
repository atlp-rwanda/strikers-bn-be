import _ from "lodash";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { validateUserRegisteration } from "../validators/user.validator";
import { TOKEN_SECRET } from "../config/key";

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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      TOKEN_SECRET,
      { expiresIn: "365d" }
    );
    // }, process.env.TOKEN_SECRET, { expiresIn: '365d' });

    const newUser = await User.create(
      _.pick(user, [
        "firstName",
        "lastName",
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

    if (!user) {
      return res.status(404).send({ message: "Invalid Email or Password!" });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Email or Password!" });
    }

    if (!user.verified) {
      return res.status(400).send({ message: "Please verify your account!" });
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
