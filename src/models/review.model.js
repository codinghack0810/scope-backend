module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        job: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
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
