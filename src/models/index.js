const dbConfig = require("../config/db.config.js"); // Import database configuration

const Sequelize = require("sequelize");

// Initialize Sequelize instance with database credentials and pool settings
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and initialize all models
db.useraccount = require("./useraccount.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.serviceprovider = require("./serviceprovider.model.js")(
    sequelize,
    Sequelize
);
db.profile = require("./profile.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);

// Define associations between models

// One-to-One relationship: UserAccount -> User
db.useraccount.hasOne(db.user, { foreignKey: "userAccountId" });
db.user.belongsTo(db.useraccount, {
    foreignKey: "userAccountId",
    onDelete: "CASCADE",
});

// One-to-Many relationship: User -> Profile
db.user.hasMany(db.profile, { foreignKey: "userId" });
db.profile.belongsTo(db.user, { foreignKey: "userId", onDelete: "CASCADE" });

// One-to-Many relationship: User -> Review
db.user.hasMany(db.review, { foreignKey: "userId" });
db.review.belongsTo(db.user, { foreignKey: "userId", onDelete: "CASCADE" });

// One-to-Many relationship: User -> Transaction
db.user.hasMany(db.transaction, { foreignKey: "userId" });
db.transaction.belongsTo(db.user, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// One-to-Many relationship: ServiceProvider -> Profile
db.serviceprovider.hasMany(db.profile, { foreignKey: "serviceProviderId" });
db.profile.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

// One-to-Many relationship: ServiceProvider -> Review
db.serviceprovider.hasMany(db.review, { foreignKey: "serviceProviderId" });
db.review.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

// One-to-Many relationship: ServiceProvider -> Transaction
db.serviceprovider.hasMany(db.transaction, { foreignKey: "serviceProviderId" });
db.transaction.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

module.exports = db; // Export the configured `db` object for use in other parts of the application
