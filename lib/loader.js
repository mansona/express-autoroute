var fs = require('fs');
var winston = require('winston');

//Public API
module.exports = {
	loadDirectory: loadDirectory
};

function loadRouteObj(app, prefix, routeObj) {

	if(!routeObj) {
		throw new Error("Couldn't find route object for file. Does not expose route api.");
	}

	for(var method in routeObj) {

		var routeList = routeObj[method];

		if(!routeList) {
			throw new Error("Couldn't load route object for file. Not defined correctly.");
		}

		for(var path in routeList) {
			var func = routeList[path];

			winston.debug("creating endpoint: " + prefix + path);
			app[method](prefix + path, func);
		}
	}
}

function loadDirectory(dirPath, prefix, app) {
	var currentFolder = dirPath + (prefix ? prefix : "");
	winston.debug("Current Folder: " + currentFolder);


	fs.readdir(currentFolder, function(err, files) {
		if(err) {
			return winston.debug("Error reading dir: " + dirPath + " Error: " + err);
		}

		files.forEach(function(path) {
			fs.stat(currentFolder + "/" + path, function(err, stats) {
				if(err) {
					return winston.debug("Error processing stats for path: " + path + " Error: " + err);
				}

				if(stats.isDirectory()) {
					loadDirectory(dirPath, "/" + path, app);
				} else {
					loadFile(currentFolder + "/" + path, prefix, app);
				}
			});
		});
	});
}



function loadFile(file, prefix, app) {
	if(file.indexOf("/.") != -1) return; //ignore dot files
	try {
		var routeObj = require(file);

		try {
			loadRouteObj(app, prefix, require(file).autoroute);
		} catch(e) {
			winston.error("Error autoloading routes. ", {
				error: e.message,
				file: file
			});
		}

	} catch(e) {
		winston.debug("Error loading file: " + file);
		winston.debug(e);
		winston.debug(e.stack);
	}
}