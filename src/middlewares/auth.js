const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: err.message });
      }
      req.userId = decoded.id;
      req.role = decoded.roleId;
      next();
    });
  } catch {
    return res.status(403).send({ message: "No token provided!" });
  }
};

exports.verifyManager = (req, res, next) => {
  if (req.roleId !== process.env.MANAGER_ID) {
    return res.status(403).send({ message: "Not authorized." });
  }
  next();
};
