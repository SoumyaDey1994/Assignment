/**
 * Insalling Required Modules
 */
require('./helpers/module.alias').load();
require('dotenv').config();
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
 * Fetch port from environmental variable
 */
const port = process.env.PORT;
/**
 * Start Express app
 */
app.listen(port, ()=>{
    console.log(`Server is Listening at PORT ${port}`);
})