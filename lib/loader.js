var fs = require('fs');

//Public API
module.exports = {
    loadDirectory: loadDirectory,
    loadFile: loadFile
};

function loadRouteObj(app, prefix, file, options) {

    if(file.indexOf('.js') !== file.length - 3){
        options.logger.warn("Ignoring file because it doesn't end with .js", {
            prefix: prefix,
            file: file
        });
        return;
    }

    var routeObj = require(file).autoroute;

    if (!routeObj) {
        options.logger.warn("Couldn't find route object for file. Does not expose route api.", {
            file: file
        });
        return;
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

    var files = fs.readdirSync(currentFolder);


    files.forEach(function(path) {
        var stats = fs.statSync(currentFolder + "/" + path);


        if (stats.isDirectory()) {
            loadDirectory(dirPath, prefix + "/" + path, app, options);
        }
        else {
            loadFile(currentFolder + "/" + path, prefix, app, options);
        }
    });
}

var dotFileMatch = new RegExp(/\/\.[^/]*$/);

function loadFile(file, prefix, app, options) {

    if (dotFileMatch.test(file)){
        options.logger.info("Ignoring this file", {
            file: file
        })
        return; //ignore dot files
    }

    try {
        try {
            loadRouteObj(app, prefix, file, options);
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
