import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config/key";
import { Roles } from '../models';

export async function adminCheck(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      if (!decoded.roleId)
        return res.status(404).send({ message: 'Invalid token provided' });
      const role = await Roles.findOne({ where: { roleId: decoded.roleId } });
      if (!role)
        return res.status(404).send({ message: 'Invalid role' });
      if (role.roleTitle != 'SUPER ADMINISTRATOR')
        return res.status(401).send({ message: 'This route can be accessed by a super administrator only!' });
      next();
    });
  } catch {
    return res.status(403).send({ message: "No token provided!" });
  }
}
