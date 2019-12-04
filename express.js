/**
 * Insalling Required Modules
 */
const express = require('express');
/**
 * Initialize the app
 */
const app = express();
/**
 * Registering middlewares
 */
require("@startup/middleware")(app);
/**
 * Connect to DB
 */
require('@startup/db')();
/**
 * Initialize the Routes
 */
require("@startup/routes")(app);
/**
 * Export the app
 */
module.exports = app;