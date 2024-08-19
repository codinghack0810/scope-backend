module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: "user_accounts",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        service: {
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
