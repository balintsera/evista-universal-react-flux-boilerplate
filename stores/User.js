/**
 * Created by balint on 16. 01. 11..
 */
var Waterline = require('waterline');

// Create a specification for a User model.
var userCollection = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
});

module.exports = userCollection;
