/*-------------------------------------------------------------------------------------------------------------------*\
|  Copyright (C) 2015 PayPal                                                                                          |
|                                                                                                                     |
|  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
|  with the License.                                                                                                  |
|                                                                                                                     |
|  You may obtain a copy of the License at                                                                            |
|                                                                                                                     |
|       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
|                                                                                                                     |
|  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
|  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
|  the specific language governing permissions and limitations under the License.                                     |
\*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

var React = require('react');
var Router = require('react-router');
var AddNewButton = require('./addNew.jsx');
var EventsSingleton = require('../../src/service/eventsManager.js');
var MovieStore = require('../../src/stores/movieStore.js');


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
        <h6>Click on a movie to see the details</h6>
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
