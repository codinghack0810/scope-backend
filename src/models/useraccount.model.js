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
        loginTracking: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    UserAccount.beforeCreate(async (userAccount, options) => {
        if (userAccount.password) {
            const salt = await bcrypt.genSalt(10);
            userAccount.password = await bcrypt.hash(
                userAccount.password,
                salt
            );
        }
    });
  
    return UserAccount;
};
