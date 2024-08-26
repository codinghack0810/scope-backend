const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Parse integer values for database pool configuration from environment variables
const max = parseInt(process.env.DB_POOL_MAX);
const min = parseInt(process.env.DB_POOL_MIN);
const acquire = parseInt(process.env.DB_POOL_ACQUIRE);
const idle = parseInt(process.env.DB_POOL_IDLE);

// Database connection configuration object
const config = {
    HOST: process.env.DB_HOST, // Database host address
    USER: process.env.DB_USER, // Database user
    PASSWORD: process.env.DB_PASSWORD, // Database user's password
    DB: process.env.DB_DATABASE, // Name of the database
    dialect: process.env.DB_DIALECT, // SQL dialect (e.g., 'mysql', 'postgres')
    pool: {
        // Pool configuration for managing database connections
        max: max, // Maximum number of connections in pool
        min: min, // Minimum number of connections in pool
        acquire: acquire, // Maximum time (ms) that pool will try to get connection before throwing error
        idle: idle, // Maximum time (ms) that a connection can be idle before being released
    },
};

// Export the configuration object for use in other parts of the application
module.exports = config;
