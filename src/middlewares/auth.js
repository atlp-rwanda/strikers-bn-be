import jwt from "jsonwebtoken";
import { MANAGER_ID, TOKEN_SECRET } from "../config/key";

export const verifyToken = async (req, res, next) => {
  try {
    // if (process.env.NODE_ENV != 'test' && !req.session.email) {
    //   return;
    // }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      req.userId = decoded.uuid;
      req.roleId = decoded.roleId;
      next();
    });
  } catch (error) {
    return res.status(403).send({ message: 'No token provided!' });
  }
};

export const verifyManager = async (req, res, next) => {
  if (req.roleId !== MANAGER_ID) {
    return res.status(403).send({ message: "Not authorized." });
  }
  next();
};
