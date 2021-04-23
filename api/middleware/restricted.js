const jwt = require("jsonwebtoken");
const secret = require("../secret")

module.exports = (req, res, next) => {
    if (!req.headers.Authorization) {
        res.status(401).json({ message: 'token required' })
      } else {
        jwt.verify(req.headers.Authorization, secret, (err, decoded) => {
          if (err) {
            res.status(401).json({ message: 'token invalid' })
          } else {
            req.user = decoded;
            next();
          }
        })
      }
};
