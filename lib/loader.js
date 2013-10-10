var fs = require('fs');

//Public API
module.exports = {
    loadDirectory: loadDirectory
};

function loadRouteObj(app, prefix, routeObj, options) {

    if (!routeObj) {
        throw new Error("Couldn't find route object for file. Does not expose route api.");
    }

    for (var method in routeObj) {

        var routeList = routeObj[method];

        if (!routeList) {
            throw new Error("Couldn't load route object for file. Not defined correctly.");
        }

        for (var path in routeList) {
            var func = routeList[path];

            var args = [prefix + path];

            //if func is arry you need to merge them
            if (func instanceof Array) {
                args = args.concat(func);
            }
            else {
                args.push(func);
            }

            options.logger.debug("creating endpoint: " + prefix + path);
            app[method].apply(app, args);
        }
    }
}

function loadDirectory(dirPath, prefix, app, options) {
    var currentFolder = dirPath + (prefix ? prefix : "");
    options.logger.debug("Current Folder: " + currentFolder);

    fs.readdir(currentFolder, function(err, files) {
        if (err) {
            options.logger.error("Error reading dir: " + dirPath + " Error: " + err);
            if (options.throwErrors) {
                throw new Error("Error reading dir: " + dirPath + "Error: " + err)
            }
            else {
                return;
            }
        }

        files.forEach(function(path) {
            fs.stat(currentFolder + "/" + path, function(err, stats) {
                if (err) {
                    options.logger.error("Error processing stats for path: " + path + " Error: " + err);
                    if (options.throwErrors) {
                        throw new Error("Error processing stats for path: " + path + " Error: " + err);
                    }
                    else {
                        return;
                    }
                }

                if (stats.isDirectory()) {
                    loadDirectory(dirPath, "/" + path, app, options);
                }
                else {
                    loadFile(currentFolder + "/" + path, prefix, app, options);
                }
            });
        });
    });
}



function loadFile(file, prefix, app, options) {
    if (file.indexOf("/.") != -1) return; //ignore dot files
    try {
        var routeObj = require(file);

        try {
            loadRouteObj(app, prefix, require(file).autoroute, options);
        }
        catch (e) {
            options.logger.error("Error autoloading routes. ", {
                error: e.message,
                file: file
            });
            options.logger.error(e.stack);
            if (options.throwErrors) {
                throw new Error("Error autoloading routes");
            }
        }

    }
    catch (e) {
        options.logger.error("Error loading file: " + file);
        options.logger.error(e.stack);
        if (options.throwErrors) {
            throw new Error("Error loading file: " + file);
        }

    }
}