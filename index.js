var loader = require('./lib/loader');
var path = require('path');

module.exports = function(app,logger) {
    if (! logger || (! (logger.debug && typeof logger.debug == 'function'))){
        console.log('not passed a working logger. using default')
        var logger = require('winston');
    }

	var routesDir = path.dirname(require.main.filename) + "/routes";

	logger.debug("Loading routes directory", {
		dir: routesDir
	});
	
	loader.loadDirectory(routesDir, "", app,logger);
};