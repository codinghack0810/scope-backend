module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        job: {
            type: Sequelize.TEXT,
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
        userRating: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        userComment: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        service: {
            type: Sequelize.INTEGER,
            references: {
                model: "service_providers",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        serviceRating: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        serviceComment: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    });

    return Review;
};
