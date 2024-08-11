const dotenv = require("dotenv");

dotenv.config();

const max = parseInt(process.env.DB_POOL_MAX);
const min = parseInt(process.env.DB_POOL_MIN);
const acquire = parseInt(process.env.DB_POOL_ACQUIRE);
const idle = parseInt(process.env.DB_POOL_IDLE);

const config = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: max,
        min: min,
        acquire: acquire,
        idle: idle,
    },
};

module.exports = config;
