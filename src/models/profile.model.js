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
            defaultValue: "",
        },
        serviceFeedback: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
    });

    return Profile;
};
