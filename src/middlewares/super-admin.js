export async function adminCheck(req, res, next) {
  if (req.user.role != 'ADMIN') { return res.status(403).send('This route can be accessed by a super administrator only!'); }
  next();
}
