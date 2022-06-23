/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
const {TOKEN_SECRET} = require('../config/key');
export async function verifyToken(req, res, next) {
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
      next();
    });
  } catch (error) {
    return res.status(403).send({ message: 'No token provided!' });
  }
}
