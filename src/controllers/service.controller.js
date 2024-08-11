// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const db = require("../models");
const ServiceProvider = db.serviceprovider;

// const SecurityOfKey = process.env.JWT_ACCESS_TOKEN_SECRET_PRIVATE;
// const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;

const test = async (req, res) => {
    await res.status(200).json({ msg: "ServiceProvider is running." });
};

const signup = async (req, res) => {
    try {
        const {
            name,
            address,
            areaOfOperation,
            servicesProvided,
            email,
        } = req.body;

        // Check if all fields are filled
        if (
            !name ||
            !address ||
            !areaOfOperation ||
            !servicesProvided ||
            !email
        ) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }

        const newService = await ServiceProvider.create({
            name,
            address,
            areaOfOperation,
            servicesProvided,
            contactInfo: email,
        });
        res.status(200).json({ msg: "ServiceProvider created successfully.", newService });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = { test, signup };
