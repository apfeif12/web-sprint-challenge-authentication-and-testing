const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = jwtSecret.JWT_SECRET;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({
                    message: "invalid token",
                });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "token required" });
    }
};
