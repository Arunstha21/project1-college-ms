const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_KEY;

exports.checkSuperUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err || decoded.superuser === false) {
      return res.status(401).json({ error: 'Unauthorized'});
    }
    req.superUser = decoded;
    next();
  });
};

exports.checkLoggedIn = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json({ error: 'Unauthorized'});
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecretKey, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized'});
    }
    next();
  });
};