module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", { // Use "user" for model name
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Auto-increment for primary key
        },
        userAccountId: { // Separate foreign key for user_accounts
            type: Sequelize.INTEGER,
            allowNull: false, // Foreign key should not be null
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validate email format
            },
        },
        address1: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        address2: {
            type: Sequelize.TEXT,
            defaultValue: "",
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        zip: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        phone1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone2: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        property_size: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
    });

    return User;
};
