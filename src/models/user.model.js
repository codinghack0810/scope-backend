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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address1: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        address2: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        city: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        state: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        zip:{
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
