module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: "user_accounts",
                key: "id",
            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        contactInfo: {
            type: Sequelize.JSON,
            allowNull: true,
            // email: {
            //     type: Sequelize.STRING,
            //     primaryKey: true,
            //     references: {
            //         model: "user_accounts",
            //         key: "email",
            //     },
            // },
            // phone: {
            //     type: Sequelize.STRING,
            //     allowNull: false,
            // },
        },
    });

    return User;
};
