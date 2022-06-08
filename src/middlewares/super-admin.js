import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/key";
import { Roles, User } from "../models";

export async function adminCheck(req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      const user = await User.findOne({ where: { uuid: decoded.uuid } });
      if (!user)
        return res.status(404).send({ message: "Invalid token owner" });
      const role = await Roles.findOne({ where: { roleId: user.roleId } });
      if (!role) return res.status(404).send({ message: "Invalid role" });
      if (role.roleTitle != "SUPER ADMINISTRATOR")
        return res
          .status(401)
          .send({
            message:
              "This route can be accessed by a super administrator only!",
          });
      next();
    });
  } catch {
    return res.status(403).send({ message: "No token provided!" });
  }
}
