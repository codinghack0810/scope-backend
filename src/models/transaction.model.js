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
        userId: { // Separate foreign key for users
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        serviceProviderId: { // Separate foreign key for service_providers
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return Transaction;
};
