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
            defaultValue: 0,
        },
        userComment: {
            type: Sequelize.TEXT,
            defaultValue: "",
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
            defaultValue: 0,
        },
        serviceComment: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
    });

    return Review;
};
