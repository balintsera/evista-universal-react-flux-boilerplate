/**
 * Created by balint on 16. 01. 11..
 */
var Waterline = require('waterline');

// Create a specification for a Pet model.
var petCollection = Waterline.Collection.extend({
  identity: 'pet',
  connection: 'default',
  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    owner: {
      model: 'user'
    }
  }
});

module.exports = petCollection;
