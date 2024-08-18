const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const db = require("../models");
dotenv.config();

const UserAccount = db.useraccount;

const sendCode = async (req, res) => {
    try {
        const { email } = req.body;

        const userAccount = await UserAccount.findOne({ where: { email } });

        // Check if the user exists
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        userAccount.active = code;
        await userAccount.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            // host: "smtp.gmail.com",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            logger: true, // log information about the transport
            debug: true, // include debug output
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify your email",
            text: `Your verification code is ${code}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ msg: error.message });
            } else {
                res.status(200).json({ msg: "Code sent.", code: code });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        if (userAccount.active === 0) {
            return res
                .status(400)
                .json({ msg: "Don't send code. Please resend." });
        }
        if (userAccount.active === code) {
            userAccount.active = 1;
            await userAccount.save();
            res.status(200).json({ msg: "Email verified." });
        } else {
            userAccount.active = 0;
            await userAccount.save();
            res.status(400).json({ msg: "Invalid code." });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { sendCode, verifyCode };