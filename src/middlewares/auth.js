<<<<<<< HEAD
import jwt from "jsonwebtoken";
=======
import jwt from 'jsonwebtoken';
>>>>>>> 530fe25 ([feat] Added trip crud API)
import { TOKEN_SECRET } from "../config/key";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      req.userId = decoded.id;
      req.roleId = decoded.roleId;
      next();
    });
  } catch (error) {
    return res.status(403).send({ message: "No token provided!" });
  }
<<<<<<< HEAD
};

export const verifyManager = async (req, res, next) => {
  if (req.roleId !== process.env.MANAGER_ID) {
    return res.status(403).send({ message: "Not authorized." });
  }
  next();
};
=======
};
>>>>>>> 530fe25 ([feat] Added trip crud API)
