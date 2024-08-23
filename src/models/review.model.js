module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        job: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        userId: {
            // Separate foreign key for users
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        userRating: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        },
        userComment: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
        serviceProviderId: {
            // Separate foreign key for service_providers
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        serviceRating: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        },
        serviceComment: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
    });

    return Review;
};
