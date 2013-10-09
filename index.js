var loader = require('./lib/loader');
var path = require('path');

module.exports = function(app,logger) {
    //is a winston instance is passed as the second argument it will be used for autoroute logging
    //otherwise it will use a 'clean' winston instance
    if (! logger || (! (logger.debug && typeof logger.debug == 'function'))) {
        var logger = require('winston');
        logger.debug('using custom logger');
    } else {
        logger.debug('using specified logger')
    }

	var routesDir = path.dirname(require.main.filename) + "/routes";

	logger.debug("Loading routes directory", {
		dir: routesDir
	});
	
	loader.loadDirectory(routesDir, "", app,logger);
};