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
            return res.status(404).json({ msg: "User did not signup. Please signup." });
        }

        // Check if the user is already verified
        if (userAccount.active == 1) {
            return res.status(400).json({ msg: "User is already verified." });
        }

        // Generate code
        const code = Math.floor(100000 + Math.random() * 900000);
        userAccount.active = code;
        await userAccount.save();

        const emailName = email.split("@")[0];

        // Send email using nodemailer(smtp)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: `Verify code`,
            text: "code",
            html: `<h3>Hello ${emailName},</h3>
            <p>You got a new code from Scope Inc:</p>
            <h1 style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">${code}</h1>
            <p>Best wishes,<br>Scope Inc.</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
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

        // Check if the user exists
        if (!userAccount) {
            return res
                .status(404)
                .json({ msg: "User did not signup. Please signup." });
        }

        // Check if the user is already verified
        if (userAccount.active == 1) {
            return res.status(400).json({ msg: "User is already verified." });
        }

        if (userAccount.active == 0) {
            return res
                .status(400)
                .json({ msg: "Please resend." });
        }
        if (userAccount.active == code) {
            userAccount.active = 1;
            await userAccount.save();
            res.status(200).json({ msg: "User verified. Please sign in" });
        } else {
            userAccount.active = 0;
            await userAccount.save();
            res.status(400).json({ msg: "Invalid code. Please resend." });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { sendCode, verifyCode };
