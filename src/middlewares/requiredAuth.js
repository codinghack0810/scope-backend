const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");
const UserAccount = db.useraccount;

dotenv.config();
const secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;

module.exports = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.headers.authorization) {
            return res.status(401).json({ msg: "No authentication." });
        }

        // Check if the token is existed.
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(401)
                .json({ msg: "No token, authentication denied." });
        }

        // Verify token
        jwt.verify(token, secretOrKey, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid." });
            }

            // Check if the user exists
            const userAccount = await UserAccount.findOne({
                where: { email: decoded.email },
            });
            if (!userAccount) {
                return res.status(404).json({ msg: "User does not exist." });
            }

            // Add user to request
            req.user = userAccount;
            await next();
        });
    } catch (error) {
        console.error("Something wrong with auth middleware.", error);
    }
};
