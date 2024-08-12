module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        service: {
            type: Sequelize.INTEGER,
            references: {
                model: "service_providers",
                key: "id",
            },
        },
        user: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
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
