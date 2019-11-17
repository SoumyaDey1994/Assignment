/**
 * Insalling Required Modules
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
/**
 * Import the routes
 */
const homeRoute = require('./routes/home');
const dataRoute = require('./routes/data');

/**
 * Initialize the app
 */
const app = express();
/**
 * Registering middlewares
 */
app.use(bodyParser.json());
app.use(morgan('combined'));
/**
 * Connect to DB
 */
require('./startup/db')();
/**
 * Initialize the Routes
 */
app.use('/data', dataRoute);
app.use('/', homeRoute);

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