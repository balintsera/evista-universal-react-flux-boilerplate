require('babel-register')({
  presets: ['react']
});

var PORT = 8080;
var path = require('path');
var express = require('express');
var renderer = require('react-engine');
var Waterline = require('waterline');
var redisAdapter  = require('sails-redis');

// Create the waterline instance.
var waterline = new Waterline();

var userCollection = require('./stores/User');
var petCollection = require('./stores/Pet');

// Add the models to the waterline instance.
waterline.loadCollection(userCollection);
waterline.loadCollection(petCollection);

// Set up the storage configuration for waterline.
var config = {
  adapters: {
    'redis': redisAdapter
  },

  connections: {
    default: {
      adapter: 'redis'
    }
  }
};


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

waterline.initialize(config, function (err, ontology) {
  if (err) {
    return console.error(err);
  }

  // Tease out fully initialised models.
  var User = ontology.collections.user;

  var Pet = ontology.collections.pet;

  // First we create a user.
  User.create({
    firstName: 'Neil',
    lastName: 'Armstrong'
  })
  .then(function (user) {
    // Then we can create a pet for the user.
    // Note that waterline automatically adds the `id` primary key to the model.
    Pet.create({
      breed: 'beagle',
      type: 'dog',
      name: 'Astro' + (Math.random() * 100),
      owner: user.id
    })
    .then(function (pet) {
      // Then we can associate the pet with the user.
      user.pets = [pet];

      // And save the user.
      return user.save();
    })
    .then(function () {
      // And now we want to get the new user back,
      // and populate the pets the user might own.
      return User.find()
              .populate('pets');
    })
    .then(console.log)
    .catch(console.error);
  });

  app.listen(PORT, function() {
    console.log('Example app listening at http://localhost:%s', PORT);
  });

});

