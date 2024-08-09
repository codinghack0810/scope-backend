const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const UserAccount = db.useraccount;

const SecurityOfKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;
const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;

const test = async (req, res) => {
  await res.status(200).json({ msg: "User is running" });
};

const signup = async (req, res) => {
  try {
    const { name, email, password, address, securityQuestion, securityAnswer } =
      req.body;

    // Check if the user already exists
    const existingUser = await UserAccount.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user account
    const newUserAccount = await UserAccount.create({
      email,
      password: hashedPassword,
      securityQuestion,
      securityAnswer,
    });

    // Create the user
    const newUser = await User.create({
      name,
      address,
      contactinfo: email,
    });

    // Respond with both created records
    res.status(201).json({ newUserAccount, newUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password, securityQuestion, securityAnswer } = req.body;
    const userAccount = await UserAccount.findOne({ where: { email } });
    if (!userAccount) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    const passwordMatch = bcrypt.compareSync(password, userAccount.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Password is incorrect." });
    }

    if (
      userAccount.securityQuestion !== securityQuestion ||
      userAccount.securityAnswer !== securityAnswer
    ) {
      return res
        .status(400)
        .json({ msg: "Security question or answer is incorrect." });
    }

    const payload = {
      id: userAccount.id,
      email: userAccount.email,
    };

    console.log(payload);

    jwt.sign(payload, SecurityOfKey, { expiresIn: expiresIn }, (err, token) => {
      if (err) throw err;
      userAccount.logintracking = true;
      userAccount.save().then(() => {
        res.status(200).json({ msg: "Successfully logged in.", token });
      });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { test, signup, signin };
