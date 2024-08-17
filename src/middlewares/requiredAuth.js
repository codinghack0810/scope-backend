const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");
const UserAccount = db.useraccount;

dotenv.config();
const secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res
                .status(400)
                .json({ msg: "No token, authentication denied." });
        }
        const token = req.headers.authorization;
        console.log("token ===========> ", token);
        if (!token) {
            return res
                .status(401)
                .json({ msg: "No token, authentication denied." });
        }
        jwt.verify(token, secretOrKey, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid." });
            }
            console.log("decoded =======> ", decoded);

            const userAccount = await UserAccount.findOne({
                where: { id: decoded.id },
            });
            req.user = userAccount;
            next();

            // UserAccount.findOne({ where: { id: decoded.id } })
            //     .then((userAccount) => {
            //         req.user = userAccount;
            //         console.log(user);

            //         next();
            //     })
            //     .catch(() => {
            //         return res
            //             .status(401)
            //             .json({ msg: "User token is not valid." });
            //     });
        });
    } catch (error) {
        console.error("Something wrong with auth middleware.", error);
    }
};
