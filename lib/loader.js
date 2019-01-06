'use strict';

const fs = require('fs');

function loadRouteObj(app, prefix, file, options) {
  if (file.indexOf('.js') !== file.length - 3) {
    options.logger.warn("Ignoring file because it doesn't end with .js", {
      prefix,
      file,
    });
    return;
  }

  // eslint-disable-next-line global-require,import/no-dynamic-require
  const routeObj = require(file).autoroute;

  if (!routeObj) {
    options.logger.warn("Couldn't find route object for file. Does not expose route api.", {
      file,
    });
    return;
  }

  Object.keys(routeObj).forEach((method) => {
    const routeList = routeObj[method];

    if (!routeList) {
      throw new Error("Couldn't load route object for file. Not defined correctly.");
    }

    Object.keys(routeList).forEach((path) => {
      const func = routeList[path];

      let args = [prefix + path];

      // if func is array you need to merge them
      if (func instanceof Array) {
        args = args.concat(func);
      } else {
        args.push(func);
      }

      options.logger.info(`creating endpoint: ${prefix}${path}`);
      // do not change this until node 4 is out of maintenance
      // eslint-disable-next-line prefer-spread
      app[method].apply(app, args);
    });
  });
}

const dotFileMatch = new RegExp(/\/\.[^/]*$/);

function loadFile(file, prefix, app, options) {
  if (dotFileMatch.test(file)) {
    options.logger.info('Ignoring this file', {
      file,
    });
    return; // ignore dot files
  }

  try {
    try {
      loadRouteObj(app, prefix, file, options);
    } catch (e) {
      options.logger.error('Error autoloading routes. ', {
        error: e.message,
        file,
      });
      options.logger.error(e.stack);
      if (options.throwErrors) {
        throw new Error('Error autoloading routes');
      }
    }
  } catch (e) {
    options.logger.error(`Error loading file: ${file}`);
    options.logger.error(e.stack);
    if (options.throwErrors) {
      throw new Error(`Error loading file: ${file}`);
    }
  }
}

function loadDirectory(dirPath, prefix, app, options) {
  const currentFolder = dirPath + (prefix || '');
  options.logger.debug(`Current Folder: ${currentFolder}`);

  const files = fs.readdirSync(currentFolder);


  files.forEach((path) => {
    const stats = fs.statSync(`${currentFolder}/${path}`);


    if (stats.isDirectory()) {
      loadDirectory(dirPath, `${prefix}/${path}`, app, options);
    } else {
      loadFile(`${currentFolder}/${path}`, prefix, app, options);
    }
  });
}

// Public API
module.exports = {
  loadDirectory,
  loadFile,
};
