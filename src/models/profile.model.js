module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: { // Separate foreign key for users
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        serviceProviderId: { // Separate foreign key for service_providers
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
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
