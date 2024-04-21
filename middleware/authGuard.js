const jwt = require('jsonwebtoken');

function jwtAuthGuard(req, res, next) {
  console.log(req.headers['authorization'])
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

module.exports = jwtAuthGuard;