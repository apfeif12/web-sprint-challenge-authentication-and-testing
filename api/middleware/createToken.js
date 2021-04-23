const jwt = require("jsonwebtoken");
const secret = "alex";

function createToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: "1000s",
    };
    return jwt.sign(payload, secret, options);
}

module.exports = createToken;
