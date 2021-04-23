const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("./auth-model.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../secret").JWT_SECRET;

router.post("/register", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "username and password required" });
    } else {
        try {
            let newRegister = await Users.findByUsername(req.body.username);
            if (newRegister != null) {
                res.status(400).json({ message: "username taken" });
            } else {
                let bcryptPassword = bcrypt.hashSync(req.body.password, 8);
                await Users.createUser({
                    username: req.body.username,
                    password: bcryptPassword,
                });
                const createdUser = await Users.findByUsername(
                    req.body.username
                );
                res.status(201).json(createdUser);
            }
        } catch (err) {
            res.status(500).json({ message: "error registering account" });
        }
    }
});

router.post("/login", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "username and password required" });
    } else {
        try {
            const newLogin = await Users.findByUsername(req.body.username);
            if (newLogin != null) {
                let bcryptPassword = bcrypt.compareSync(
                    req.body.password,
                    newLogin.password
                );
                if (bcryptPassword) {
                    jwt.sign(
                        { username: newLogin.username },
                        JWT_SECRET,
                        (err, token) => {
                            if (err) {
                                res.status(500).json({
                                    message: "invalid credentials",
                                });
                            } else {
                                res.status(200).json({
                                    message: `Welcome, ${newLogin.username}`,
                                    token,
                                });
                            }
                        }
                    );
                } else {
                    res.status(400).json({ message: "invalid credentials" });
                }
            } else {
                res.status(400).json({ message: "invalid credentials" });
            }
        } catch (err) {
            res.status(500).json({ message: "invalid credentials" });
        }
    }
});

module.exports = router;
