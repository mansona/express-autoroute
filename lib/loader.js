var fs = require('fs');

//Public API
module.exports = {
	loadDirectory: loadDirectory
};

function loadRouteObj(app, prefix, routeObj,logger) {

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

			var args = [prefix + path];

			//if func is arry you need to merge them
			if(func instanceof Array){
				args = args.concat(func);
			} else {
				args.push(func);
			}

			logger.debug("creating endpoint: " + prefix + path);
			app[method].apply(app, args);
		}
	}
}

function loadDirectory(dirPath, prefix, app,logger) {
	var currentFolder = dirPath + (prefix ? prefix : "");
	logger.debug("Current Folder: " + currentFolder);

	fs.readdir(currentFolder, function(err, files) {
		if(err) {
			return logger.debug("Error reading dir: " + dirPath + " Error: " + err);
		}

		files.forEach(function(path) {
			fs.stat(currentFolder + "/" + path, function(err, stats) {
				if(err) {
					return logger.debug("Error processing stats for path: " + path + " Error: " + err);
				}

				if(stats.isDirectory()) {
					loadDirectory(dirPath, "/" + path, app,logger);
				} else {
					loadFile(currentFolder + "/" + path, prefix, app,logger);
				}
			});
		});
	});
}



function loadFile(file, prefix, app,logger) {
	if(file.indexOf("/.") != -1) return; //ignore dot files
	try {
		var routeObj = require(file);

		try {
			loadRouteObj(app, prefix, require(file).autoroute,logger);
		} catch(e) {
			logger.error("Error autoloading routes. ", {
				error: e.message,
				file: file
			});
			logger.debug(e);
			logger.debug(e.stack);
		}

	} catch(e) {
		logger.debug("Error loading file: " + file);
		logger.debug(e);
		logger.debug(e.stack);

	}
}