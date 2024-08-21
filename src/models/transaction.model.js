module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user_accounts",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        serviceId: {
            type: Sequelize.INTEGER,
            references: {
                model: "service_providers",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return Transaction;
};
