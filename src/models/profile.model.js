module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        service: {
            type: Sequelize.INTEGER,
            references: {
                model: "service_providers",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: "user_accounts",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        userFeedback: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        serviceFeedback: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    });

    return Profile;
};
