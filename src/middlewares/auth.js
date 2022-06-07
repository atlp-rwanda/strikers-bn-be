const jwt = require("jsonwebtoken");

exports.verifyToken = verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
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
