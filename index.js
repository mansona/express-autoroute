var loader = require('./lib/loader');
var path = require('path');
var winston = require('winston');

module.exports = function(app) {

	var routesDir = path.dirname(require.main.filename) + "/routes";

	winston.debug("Loading routes directory", {
		dir: routesDir
	});
	
	loader.loadDirectory(routesDir, "", app);
};