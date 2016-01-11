require('babel-register')({
  presets: ['react']
});

var PORT = 8080;
var path = require('path');
var express = require('express');
var renderer = require('react-engine');
var MovieStore = require('./stores/movieStore.js');
const movies = MovieStore.getAll();

var app = express();

// create the view engine with `react-engine`
var reactRoutesFilePath = path.join(__dirname + '/client/routes.jsx');

var engine = renderer.server.create({
  routes: require(reactRoutesFilePath),
  routesFilePath: reactRoutesFilePath
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', path.join(__dirname, '/views'));

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

// expose public folder as static assets
app.use(express.static('public'));

// Server side routes
const serverSideRoutes = require('./server/routes.js')(app);

// add the react routes
app.get('*', function(req, res) {
  res.render(req.url, {
    movies: movies
  });
});

var server = app.listen(PORT, function() {
  console.log('Example app listening at http://localhost:%s', PORT);
});
