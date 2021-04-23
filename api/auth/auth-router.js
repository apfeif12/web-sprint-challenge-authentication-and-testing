const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("./auth-model.js");
const checkValid = require("../middleware/checkValid.js");
const createToken = require("../middleware/createToken.js");

router.post("/register", async (req, res) => {
    if (checkValid(req.body)) {
        try {
            const { username, password } = req.body;
            const hash = bcrypt.hashSync(password, 8);
            const user = { username, password: hash };
            const newUser = Users.create(user);
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message: "username taken" });
        }
    } else {
        res.status(400).json({ message: "username and password required" });
    }
});

router.post("/login", async (req, res) => {
    if (checkValid(req.body)) {
        try {
            const { username, password } = req.body;
            const hash = bcrypt.hashSync(password, 8);
            const user = { username, password: hash };
            Users.findBy({ username: username });
            if (username && bcrypt.compareSync(password)) {
                const token = createToken(user);
                res.status(200).json({ message: `Welcome ${username}`, token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (err) {
            res.status(500).json({ message: "Invalid credentials" });
        }
    } else {
        res.status(400).json({ message: "username and password required" });
    }
});

module.exports = router;
