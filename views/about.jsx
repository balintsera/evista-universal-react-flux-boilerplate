'use strict';

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({

  mixins: [Router.State],

  render: function render() {
    return (
      <div id='about'>
        <h1>About page</h1>
        This is about page
      </div>
    );
  }
});
