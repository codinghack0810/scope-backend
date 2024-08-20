module.exports = (sequelize, Sequelize) => {
    const ServiceProvider = sequelize.define("service_provider", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.TEXT,
            // allowNull: false,
            defaultValue: "",
        },
        areaOfOperation: {
            type: Sequelize.TEXT,
            defaultValue: "",
            // allowNull: false,
        },
        servicesProvided: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        rating: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        },
        contactInfo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return ServiceProvider;
};
