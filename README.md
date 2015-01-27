[![Dependency Status](https://david-dm.org/Blooie/express-autoroute.png)](https://david-dm.org/Blooie/express-autoroute)
[![Build Status](https://travis-ci.org/Blooie/express-autoroute.png?branch=develop)](https://travis-ci.org/Blooie/express-autoroute)
[![Code Climate](https://codeclimate.com/github/Blooie/express-autoroute.png)](https://codeclimate.com/github/Blooie/express-autoroute)

# Express Autoroute
This helper library has come about after about a year of slowly improving how we structure our NodeJS apps at Blooie and ultimately me being fed up of having to continuously type out ```app.get('/blah', blah_handler)``` and wondering where different paths are being constructed.

I also subscribe to the idea of [convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) because we developers have enough to think about. Also for something like NodeJS where there are so many people trying it out for the first time and fewer people blogging about best practices, sometimes its better to just follow convention and learn good ways to structure your app and write re-usable code.

## Installation
```js
npm install express-autoroute
```

## Usage
First things first you need to enable the autorouter and pass it your express app.

```js
var autoroute = require('express-autoroute');
autoroute(app,options); //where app is an express app;
```

For express-autoroute to start working you need to have a ```routes/``` folder that contains specially formatted javascript files that expose an autoroute object that contains the public route api. The best way to describe it is with an example.

###Options
Passed as a JS object to the autoroute initialisation funciton

```js
//defaults
autoroute(app, {
	throwErrors: false,
	logger: require('winston'), //autoroute requires winston internally if you don't pass an instance to it
	routesDir: 'routes'
})
```

```throwErrors: Boolean``` will throw all errors found while loading routes

```logger: winston instance``` as a default it will use the internal default winston object. If you wish to use custom settings then pass in an instance defined within your app.

```routesDir: String``` sets the directory to search for autoroute files

```routeFile: String``` allows loading of one file instead of a directory, useful for testing

###Example autoroute File

This is the contents of a file  ```routes/blacklists.js```. Note that the name of the file has nothing to do with the resulting endpoint so you can structure your files however you like.

```js
module.exports.autoroute = {
	get: {
		'/blacklists' : get_all,
		'/blacklists/:id' : get
	},
	post: {
		'/blacklists/:id' : update,
		'/blacklists' : create
	},
	delete: {
		'/blacklists/:id' : del
	}
};

function get_all(req, res){
	//do something
}

...
```
As you can see the file is exposing a structured object. This object will be used later to decide what endpoints to create for the express application and will ultimately result in the following commands being executed

```js
app.get('/blacklists/', get_all);
app.get('/blacklists/:id', get_all);
app.post('/blacklists/:id', update);
app.post('/blacklists', create);
app.detete('/blacklists/:id' : del);
```

And thats it! A nicely declarative way to load your routes.

### Folders
express-autoroute also supports routes being separated into folders. The folder name will be added as a prefix to the express endpoints. For example, if you use the same ```blacklists.js``` file from before but move it to the folder ```routes/api/blacklists.js``` the resulting express commands will look like this

```js
app.get('/api/blacklists/', get_all);
app.get('/api/blacklists/:id', get_all);
app.post('/api/blacklists/:id', update);
app.post('/api/blacklists', create);
app.detete('/api/blacklists/:id' : del);
```

### Middlewares
A nifty feature in express is the ability to have route specific middlewares, and if they are used correctly they can really reduce the amount of code you write and always keep things DRY. express-autoroute supports the use of route middlewares by just adding an array to the autoroute object. Here is a silly little example but at least it explains the idea:

```js
module.exports.autoroute = {
	get: {
		'/blacklists' : [authentication, get_all]
	}
};

function get_all(req, res){
	//use the user object to get something
	var myBlacklists = db.getMyBlacklists(req.user.id)
	res.send(myBlacklists);
}

function authentication(req, res, next){
	//get the user object or whatever
	req.user = dbUser;
	next();
}
```

# Licence
Copyright (c) 2013, Andrew Manson <andrew@bloo.ie>, Blooie Limited <info@bloo.ie>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Blooie/express-autoroute/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
