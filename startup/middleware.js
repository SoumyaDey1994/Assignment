const bodyParser = require('body-parser');
const morgan = require('morgan');
const statusMonitor = require('express-status-monitor');
const i18n = require('i18n');
/**
 * i18n Configurations
 */
i18n.configure({
    // setup some locales - other locales default to en silently
    locales: ['en_US', 'it_IT', 'pt_BR', 'de_DE', 'fr_FR'],
    //default locale
    defaultLocale: 'en_US',
    // where to store json files - defaults to './locales' relative to modules directory
    directory: '../locales',
    // control mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
    directoryPermissions: '755',
    // watch for changes in json files to reload locale on updates - defaults to false
    autoReload: true
})

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(morgan('combined'));
    app.use(statusMonitor());
    app.use(i18n.init);
}