'use strict';

var React = require('react');
var Router = require('react-router');
var AddNewButton = require('./addNew.jsx');
var EventsSingleton = require('../service/eventsManager.js');
var MovieStore = require('../stores/movieStore.js');


module.exports = React.createClass({
  componentDidMount: function() {
    EventsSingleton.emitter.on('dom-change', this.updateElement);
  },

  updateElement: function() {
    // Update state
    console.log('updateElement called on List component');
   
    var movies = MovieStore.getAll();
    console.log(movies);
    // Important: this.setState({movies: MovieStore.getAll()}); won't work :(
    this.setState({movies: movies});
  },

  getInitialState: function() {
    return {movies: this.props.movies};
  },

  render: function render() {

    return (
      <div id='list'>
        <h1>Movies</h1>
        <h3>Click on a movie to see the details...</h3>
        <AddNewButton />
        <ul>
          {this.state.movies.map(function(movie) {
            return (
              <li>
                <Router.Link to='detail' params={{id: movie.id}}>
                  <img src={movie.image} alt={movie.title} />
                </Router.Link>
              </li>
            );
          })}

        </ul>
      </div>
    );
  }
});
