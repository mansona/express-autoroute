var loader = require('./lib/loader');
var path = require('path');
var winston = require('winston');

module.exports = function(app) {

	var routesDir = path.join(process.cwd(), "routes");
	
	winston.debug("Loading routes directory", {
		dir: routesDir
	});
	
	loader.loadDirectory(routesDir, "", app);
};
