const db = require("../models");
const UserAccount = db.useraccount;

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userAccount = await UserAccount.findOne({ where: { email } });
        if (!userAccount) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        // Check if the user is already verified
        if (userAccount.active === 1) {
            await next();
        } else {
            return res.status(400).json({ msg: "User is not verified. Please verify." });
        }
    } catch (error) {
        await res.status(500).json({ msg: "Server error(Verify middleware).", error: error.message });
    }
};
