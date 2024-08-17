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
            allowNull: true,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address1: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        address2: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        city:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phone1: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phone2: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return User;
};
