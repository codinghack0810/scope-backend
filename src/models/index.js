const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

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

db.useraccount = require("./useraccount.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.serviceprovider = require("./serviceprovider.model.js")(
    sequelize,
    Sequelize
);
db.profile = require("./profile.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);

db.useraccount.hasOne(db.user, { foreignKey: "userAccountId" });
db.user.belongsTo(db.useraccount, {
    foreignKey: "userAccountId",
    onDelete: "CASCADE",
});

db.user.hasMany(db.profile, { foreginKey: "userId" });
db.profile.belongsTo(db.user, { foreginKey: "userId", onDelete: "CASCADE" });

db.user.hasMany(db.review, { foreginKey: "userId" });
db.review.belongsTo(db.user, { foreginKey: "userId", onDelete: "CASCADE" });

db.user.hasMany(db.transaction, { foreginKey: "userId" });
db.transaction.belongsTo(db.user, {
    foreginKey: "userId",
    onDelete: "CASCADE",
});

db.serviceprovider.hasMany(db.profile, { foreginKey: "serviceProviderId" });
db.profile.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

db.serviceprovider.hasMany(db.review, { foreginKey: "serviceProviderId" });
db.review.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

db.serviceprovider.hasMany(db.transaction, { foreginKey: "serviceProviderId" });
db.transaction.belongsTo(db.serviceprovider, {
    foreignKey: "serviceProviderId",
    onDelete: "CASCADE",
});

module.exports = db;
