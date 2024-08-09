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

    // Check if all fields are filled
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !securityQuestion ||
      !securityAnswer
    ) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }

    // Check if the user already exists
    const existingUser = await UserAccount.findOne({ where: { email } });
    if (existingUser) {
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
      contactinfo: email,
    });

    // Remove the password and security question from the response
    const {
      password: _,
      securityQuestion: __,
      securityAnswer: ___,
      ...newUserAccountWithoutPassword
    } = newUserAccount.toJSON();

    // Respond with both created records
    res.status(201).json({
      msg: "Successfully signed up.",
      newUserAccountWithoutPassword,
      newUser,
    });
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
    const passwordMatch = bcrypt.compareSync(password, userAccount.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Password is incorrect." });
    }

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
        res.status(200).json({ msg: "Successfully signed in.", token });
      });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { test, signup, signin };
