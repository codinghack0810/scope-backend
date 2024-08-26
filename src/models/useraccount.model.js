const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const UserAccount = sequelize.define("user_account", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        securityQuestion: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        securityAnswer: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        isFirst: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        loginTracking: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        active: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    });

    // Define a beforeCreate hook on the UserAccount model
    UserAccount.beforeCreate(async (userAccount, options) => {
        // Check if password is provided and hash it using bcrypt
        if (userAccount.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            userAccount.password = await bcrypt.hash(
                userAccount.password,
                salt
            ); // Hash the password with the generated salt
        }

        // Check if securityAnswer is provided and hash it using bcrypt
        if (userAccount.securityAnswer) {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            userAccount.securityAnswer = await bcrypt.hash(
                userAccount.securityAnswer,
                salt
            ); // Hash the security answer with the generated salt
        }
    });

    return UserAccount;
};
