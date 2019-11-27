
/**
 * Import the routes
 */
const homeRoute = require('@route/home');
const dataRoute = require('@route/data');

module.exports = (app) => {
    app.use('/data', dataRoute);
    app.use('/', homeRoute);
}