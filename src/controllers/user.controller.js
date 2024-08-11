const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { parsePhoneNumberFromString } = require("libphonenumber-js/min");
const db = require("../models");
const { where } = require("sequelize");
const User = db.user;
const UserAccount = db.useraccount;

const SecurityOfKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;
// const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;

const test = async (req, res) => {
    await res.status(200).json({ msg: "User is running" });
};

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            address,
            phone,
            securityQuestion,
            securityAnswer,
        } = req.body;

        // Check if all fields are filled
        if (
            !name ||
            !email ||
            !password ||
            !address ||
            !phone ||
            !securityQuestion ||
            !securityAnswer
        ) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }

        const userAccount = await UserAccount.findOne({ where: { email } });
        if (userAccount) {
            return res.status(400).json({ msg: "User already exists." });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the user account
        const newUserAccount = await UserAccount.create({
            email,
            password: hashedPassword,
            securityQuestion,
            securityAnswer,
        });

        // Create the user
        const newUser = await User.create({
            id: newUserAccount.id,
            name,
            address,
            contactInfo: [{ email: newUserAccount.email }, { phone }],
        });

        // Respond with both created records
        res.status(201).json({ msg: "Successfully signed up." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        // Check if the password is correct
        const passwordMatch = bcrypt.compareSync(
            password,
            userAccount.password
        );
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Password is incorrect." });
        }

        const user = await User.findOne({ where: { id: userAccount.id } });

        // Create JWT Payload
        const payload = {
            id: userAccount.id,
            email: userAccount.email,
        };

        // Sign Token
        jwt.sign(payload, SecurityOfKey, (err, token) => {
            if (err) throw err;
            userAccount.logintracking = true;
            userAccount.save().then(() => {
                res.status(200).json({
                    msg: "Successfully signed in.",
                    token,
                    user,
                });
            });
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const signout = async (req, res) => {
    try {
        const { email } = req.body;
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        userAccount.logintracking = false;
        userAccount.save().then(() => {
            res.status(200).json({ msg: "Successfully signed out." });
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = { test, signup, signin, signout };
