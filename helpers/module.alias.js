const moduleAlias = require('module-alias');

const root = __dirname + '/..';

moduleAlias.addAliases({
    '@root'  : root,
    '@route': root + '/routes',
    '@controller': root + '/controllers',
    '@service': root + '/services',
    '@provider': root + '/providers',
    '@helper': root + '/helpers',
    '@model': root + '/models',
    '@public': root + '/public',
    '@startup': root + '/startup'
})

module.exports.load = () => moduleAlias;