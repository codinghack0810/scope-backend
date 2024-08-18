const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Op = require("sequelize").Op;
const db = require("../models");
const User = db.user;
const UserAccount = db.useraccount;
const ServiceProvider = db.serviceprovider;

const SecurityOfKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;
// const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;

const test = async (req, res) => {
    await res.status(200).json({ msg: "User is running" });
};

const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            address1,
            city,
            state,
            zip,
            phone1,
            securityQuestion,
            securityAnswer,
        } = req.body;

        // Check if all fields are filled
        if (!email || !password || !securityQuestion || !securityAnswer) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }

        const userAccount = await UserAccount.findOne({ where: { email } });
        if (userAccount) {
            return res.status(400).json({ msg: "User already exists." });
        }

        // Create the user account
        const newUserAccount = await UserAccount.create({
            email,
            password,
            securityQuestion,
            securityAnswer,
        });

        // Create the user
        await User.create({
            id: newUserAccount.id,
            email: newUserAccount.email,
            firstName,
            lastName,
            address1,
            city,
            state,
            zip,
            phone1,
        });

        // Respond with both created records
        res.status(201).json({ msg: "Successfully signed up." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
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

        if (userAccount.loginTracking) {
            return res.status(400).json({ msg: "User is already logged in." });
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

        userAccount.loginTracking = true;
        const isFirst = await userAccount.isFirst;

        // Check if the user is first time login
        if (isFirst) {
            userAccount.isFirst = false;
        }

        // Sign Token
        jwt.sign(payload, SecurityOfKey, (err, token) => {
            if (err) throw err;
            userAccount.save().then(() => {
                res.status(200).json({
                    msg: "Successfully signed in.",
                    token,
                    user,
                    isFirst,
                });
            });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const signout = async (req, res) => {
    try {
        const email = req.user.email;
        console.log("user => ", req.user);
        console.log("email => ", email);

        const userAccount = await UserAccount.findOne({
            where: { email: email },
        });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        userAccount.loginTracking = false;
        userAccount.save().then(() => {
            res.status(200).json({ msg: "Successfully signed out." });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.user.id;

        const {
            firstName,
            lastName,
            email,
            address1,
            address2,
            phone1,
            phone2,
            city,
            state,
            zip,
            securityQuestion,
            securityAnswer,
        } = req.body;

        // Check if the user exists
        const userAccount = await UserAccount.findOne({ where: { id: id } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        if (email) {
            // Check if the email is already taken
            const emailTaken = await UserAccount.findOne({
                where: { email },
            });
            if (emailTaken && emailTaken.id !== id) {
                return res.status(400).json({ msg: "Email is already taken." });
            }
        }

        // Update the userAccount
        await UserAccount.update(
            {
                email,
                securityQuestion,
                securityAnswer,
            },
            { where: { id: id } }
        );

        userAccount.isFirst = false;
        await userAccount.save();

        // Update the user
        await User.update(
            {
                firstName,
                lastName,
                email,
                address1,
                address2,
                phone1,
                phone2,
                city,
                state,
                zip,
            },
            { where: { id: id } }
        );

        const updatedUser = await User.findOne({ where: { id: id } });

        res.status(200).json({ msg: "Successfully.", updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const fillUser = async (req, res) => {
    try {
        const { id } = req.user.id;
        const {
            firstName,
            lastName,
            address1,
            address2,
            phone1,
            phone2,
            city,
            state,
            zip,
        } = req.body;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        const filledUser = await User.update(
            {
                firstName,
                lastName,
                address1,
                address2,
                phone1,
                phone2,
                city,
                state,
                zip,
            },
            { where: { id } }
        );
        const userAccount = await UserAccount.findOne({ where: { id } });
        userAccount.isFirst = false;
        await userAccount.save();
        res.status(200).json({ msg: "Successfully filled.", filledUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const search = async (req, res) => {
    try {
        const { key } = req.params;

        const searchedService = await ServiceProvider.findAll({
            where: {
                servicesProvided: {
                    [Op.like]: `%${key}%`,
                },
            },
        });

        if (!searchedService) {
            return res.status(404).json({ msg: "No service found." });
        }

        res.status(200).json({
            msg: "Successfully searched.",
            searchedService,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    test,
    signup,
    signin,
    signout,
    fillUser,
    updateUser,
    search,
};
