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

db.useraccount.hasOne(db.user, { foreignKey: "id" });
db.user.belongsTo(db.useraccount, { foreignKey: "id" });

db.useraccount.hasMany(db.profile, { foreginKey: "userId" });
db.profile.belongsTo(db.useraccount, { foreginKey: "userId" });

db.useraccount.hasMany(db.review, { foreginKey: "userId" });
db.review.belongsTo(db.useraccount, { foreginKey: "userId" });

db.useraccount.hasMany(db.transaction, { foreginKey: "userId" });
db.transaction.belongsTo(db.useraccount, { foreginKey: "userId" });

db.serviceprovider.hasMany(db.profile, { foreginKey: "serviceId" });
db.profile.belongsTo(db.serviceprovider, { foreignKey: "serviceId" });

db.serviceprovider.hasMany(db.review, { foreginKey: "serviceId" });
db.review.belongsTo(db.serviceprovider, { foreignKey: "serviceId" });

db.serviceprovider.hasMany(db.transaction, { foreginKey: "serviceId" });
db.transaction.belongsTo(db.serviceprovider, { foreignKey: "serviceId" });

module.exports = db;
