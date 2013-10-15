var loader = require('./lib/loader');
var path = require('path');

module.exports = function(app, options) {
    //is a winston instance is passed as the second argument it will be used for autoroute logging
    //otherwise it will use a 'clean' winston instance
    if (!options.logger || (!(options.logger.debug && typeof options.logger.debug == 'function'))) {
        options.logger = require('winston');
        options.logger.debug('using custom logger');
    }
    else {
        options.logger.debug('using specified logger')
    }

    var routesDir = path.join(process.cwd(), "routes");

    options.logger.debug("Loading routes directory", {
        dir: routesDir
    });

    loader.loadDirectory(routesDir, "", app, options);
};
