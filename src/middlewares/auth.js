import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/key";

export async function verifyToken (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      req.userId = decoded.uuid;
      next();
    });
  } catch {
    return res.status(403).send({ message: "No token provided!" });
  }
};