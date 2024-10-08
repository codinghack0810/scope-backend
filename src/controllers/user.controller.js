const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Op = require("sequelize").Op;
const db = require("../models");
const User = db.user;
const UserAccount = db.useraccount;
const ServiceProvider = db.serviceprovider;
const Profile = db.profile;

const SecurityOfKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;
// const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;

const test = async (req, res) => {
    await res.status(200).json({ msg: "User is running" });
};

//* POST /signup
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

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !address1 ||
            !city ||
            !state ||
            !phone1 ||
            !securityQuestion ||
            !securityAnswer
        ) {
            return res.status(400).json({ msg: "Please fill all data." });
        }

        const userAccount = await UserAccount.findOne({ where: { email } });
        if (userAccount) {
            if (userAccount.active !== 1) {
                return res
                    .status(400)
                    .json({ msg: "User is not verified. Please verify." });
            } else {
                return res.status(400).json({ msg: "User already exists." });
            }
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
            userAccountId: newUserAccount.id,
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
        res.status(201).json({ msg: "Successfully signed up. Please verify." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* POST /signin
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        //TODO: use this
        // Check if the user is already logged in
        // if (userAccount.loginTracking) {
        //     return res.status(400).json({ msg: "User is already logged in." });
        // }

        // Check if the password is correct
        const passwordMatch = bcrypt.compareSync(
            password,
            userAccount.password
        );
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Password is incorrect." });
        }

        //! remove this
        const user = await User.findOne({ where: { id: userAccount.id } });

        //TODO: use this
        // const user = await User.findOne({
        //     // include: {model: UserAccount, as: "user_account", attributes: ["isFirst"]},
        //     include: { model: UserAccount, attributes: ["isFirst"] },
        //     where: { userAccountId: userAccount.id },
        // });

        // Create JWT Payload
        const payload = {
            id: userAccount.id,
            email: userAccount.email,
        };

        userAccount.loginTracking = true;
        const isFirst = await userAccount.isFirst;

        //! remove this
        // Check if the user is first time login
        if (isFirst) {
            userAccount.isFirst = false;
        }

        //TODO: use this
        // Check if the user is first time login
        // if (userAccount.isFirst) {
        //     userAccount.isFirst = false;
        // }

        // Sign Token
        jwt.sign(payload, SecurityOfKey, (err, token) => {
            if (err) throw err;
            userAccount.save().then(() => {
                res.status(200).json({
                    msg: "Successfully signed in.",
                    token,
                    user,
                    isFirst, //! remove this
                });
            });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* POST /signout
const signout = async (req, res) => {
    try {
        const userAccount = req.user;
        userAccount.loginTracking = false;
        await userAccount.save().then(() => {
            res.status(200).json({ msg: "Successfully signed out." });
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* PUT /data
const updateUser = async (req, res) => {
    try {
        const userAccount = req.user;
        const { id } = userAccount;

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

        // Check if the user exists
        const user = await User.findOne({ where: { userAccountId: id } });
        if (!user) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        // Update the user
        await User.update(
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
            { where: { userAccountId: id } }
        );

        const updatedUser = await User.findOne({
            where: { userAccountId: id },
        });

        res.status(200).json({ msg: "Successfully.", updatedUser });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* GET /search
const search = async (req, res) => {
    try {
        const { key } = req.query;

        // Check if the service exists
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

//* GET /all
const allServices = async (req, res) => {
    try {
        const services = await ServiceProvider.findAll({});
        res.status(200).json({ msg: "Successfully all search.", services });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* GET /forgotpwd
const forgotPwd = async (req, res) => {
    try {
        const { email } = req.query;
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        res.status(200).json({
            msg: "Please input the answer.",
            securityQuestion: userAccount.securityQuestion,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* POST /forgotpwd
const forgotPwdAnswer = async (req, res) => {
    try {
        const { email, securityQuestion, securityAnswer } = req.body;
        const userAccount = await UserAccount.findOne({
            where: { email, securityQuestion },
        });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        const secAnsMatch = await bcrypt.compare(
            securityAnswer,
            userAccount.securityAnswer
        );
        if (!secAnsMatch) {
            return res
                .status(400)
                .json({ msg: "Security answer does not match." });
        }
        res.status(200).json({ msg: "User can reset password." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//* PUT /forgotpwd
const forgotPwdReset = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }
        const newPasswordHash = await bcrypt.hash(password, 10);
        userAccount.password = newPasswordHash;
        await userAccount.save();
        res.status(200).json({ msg: "Successfully reset password." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    test,
    signup,
    signin,
    signout,
    updateUser,
    search,
    allServices,
    forgotPwd,
    forgotPwdAnswer,
    forgotPwdReset,
};
