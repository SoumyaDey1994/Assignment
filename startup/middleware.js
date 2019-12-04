const bodyParser = require('body-parser');
const morgan = require('morgan');
const statusMonitor = require('express-status-monitor');
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(morgan('combined'));
    app.use(statusMonitor());
}