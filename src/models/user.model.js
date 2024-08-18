module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: "user_accounts",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        firstName: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        lastName: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address1: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
        address2: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
        city:{
            type: Sequelize.STRING,
            defaultValue: "",
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        zip: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        phone1: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        phone2: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });

    return User;
};
