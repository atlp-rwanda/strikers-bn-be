import jwt from "jsonwebtoken";
import { MANAGER_ID, TOKEN_SECRET } from "../config/key";
const {verify} = jwt

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

export function authenticate(req,res,next){

  

  const token = req.header("Authorization").trim()

  if(!token)return res.status(401).send("Access denied loggin first!")

  try{
    const TokenArray= token.split(' ')
    console.log(TOKEN_SECRET)
  let user = verify(TokenArray[1],(TOKEN_SECRET).trim())
        req.user = user
        next()
  }catch(e){
    res.status(400).send("Invalid token" +e)
  }

}
