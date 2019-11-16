/**
 * Insalling Required Modules
 */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
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
app.use(morgan());

/**
 * Initialize the Routes
 */
app.use('/data', dataRoute);
app.use('/', homeRoute);

/**
 * Fetch port from environmental variable
 */
const port = process.env.PORT;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString, {useNewUrlParser: true})
        .then(()=>console.log(`Connected to MongoDb Successfully`))
        .catch((error)=>console.log(`Error in connecting to mongoDB`));
/**
 * Start Express app
 */
app.listen(port, ()=>{
    console.log(`Server is Listening at PORT ${port}`);
})