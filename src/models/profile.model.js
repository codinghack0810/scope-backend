module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        serviceId: {
            type: Sequelize.INTEGER,
            references: {
                model: "service_providers",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user_accounts",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        rating: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        },
        comment: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        userFeedback: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        serviceFeedback: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });

    return Profile;
};
