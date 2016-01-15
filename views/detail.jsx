'use strict';

var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({

  mixins: [Router.State],

  render: function render() {
    let movieId = this.getParams().id;
    var movie = this.props.movies.filter(function(_movie) {
      return _movie.id === movieId;
    })[0];

    return (
      <div id='detail'>
        <h2>{movie.title}</h2>
        <img src={movie.image} alt={movie.title} />
        <a href={movie.url} target='_blank'>more info</a>
      </div>
    );
  }
});
