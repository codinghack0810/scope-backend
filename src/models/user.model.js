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
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address1: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        address2: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        zip: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        phone1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone2: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        property_size: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });

    return User;
};
