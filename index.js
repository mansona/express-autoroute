var loader = require('./lib/loader');
var path = require('path');

module.exports = function(app,logger) {

	var routesDir = path.dirname(require.main.filename) + "/routes";

	logger.debug("Loading routes directory", {
		dir: routesDir
	});
	
	loader.loadDirectory(routesDir, "", app,logger);
};