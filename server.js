require('./helpers/module.alias').load();
require('dotenv').config();

const http = require("http");
const app = require("./express");

const server = http.createServer(app);
/**
 * Register Handler for uncaught exceptions
 */
process.on('uncaughtException', (error)=>{
    console.log(`Some unexpected error happened`);
    process.exit(1);
})
/**
 * Fetch port from environmental variable
 */
const port = process.env.PORT;
/**
 * Start Express app
 */
server.listen(port, ()=>{
    console.log(`Server is Listening at PORT ${port}`);
})