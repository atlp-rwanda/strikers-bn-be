export async function checkTravelAdmin(req, res, next) {
  if (req.user.role != 'TRAVEL ADMINISTRATOR') {
    return res.status(403).send('Only Travel admins should be able add their accommodation  facilities!');
  }
  next();
}
