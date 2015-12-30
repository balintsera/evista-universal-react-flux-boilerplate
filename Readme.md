# Universal (isomorphic) react flux boilerplate (Evista Agency)
This movie catalog app illustrates the usage of react-engine to build and run an universal/isomorphic app with flux 

## app composition
* [express - 4.x](https://github.com/strongloop/express) on the server side
* [react-engine - 2.x](https://github.com/paypal/react-engine) as the express view render engine
* [react - 0.13.x](https://github.com/facebook/react) for building the UI
* [react-router - 0.13.x](https://github.com/rackt/react-router) for UI routing
* [webpack - 1.x](https://github.com/webpack/webpack) as the client side module loader
* [babel - 6.x](https://github.com/babel/babel) for compiling the ES6/JSX code

## tl;dr - to run the boilerplate example
```shell
# cd `into_this_dir`
$ npm install
$ npm start
$ open http://localhost:3000
```

## developing (reload node on every single file change)
```shell
$ webpack --progress --colors --watch
$ open http://localhost:3000
```

## step by step walkthrough to build an app from this boilerplate

### step 0
Clone this repo then remove .git folder from the root (we don't want to version control this repo, but the new app instead), and finally run 'git init .' to initialize the new repo. 

### step 1
```shell
  # let us start by installing the dependencies for our app
  # create a npm manifest
  # (fill out the needed information like name, author, etc..)
  $ npm init

  # install express, react, react-router & react-engine and the rest of the dependencies
  $ npm install --save
```

### step 2
```shell
  # build and watch for developing
  $ $ webpack --progress --colors --watch
```

### step 3

Start building your application. 

Please set up your editor to use Eslint (via .eslintrc file that is located on the root of this repo) to help you follow common coding practices. Ask Bálint for help :) 

Folder convetions:
* React components goes to `/public/views`
* Stores and entity related files goes to `src/stores`
* Static assets goes to public/assets

File names are camelCased exept for classes that are UpperCased.  

If you break this rules a kitty dies :)

## Remove the movie example related files

* From /views: `list.jsx, detail.jsx, addNew.jsx, about.jsx` 

* From client/routes.jsx: `remove/replace all Router.Route and Router.DefaultRoute`

* From /stores: `remove MovieStore.js, and remove all require/import that points to this store`

## How to add a new page

### Add a new route

Head to `client/routes.jsx`, add a new <Router.Route /> component below:

```javascript
var routes = module.exports = (
  <Router.Route path='/' handler={Layout}>
    <Router.DefaultRoute name='list' handler={ListPage} />
    <Router.Route name='detail' path='/movie/:id' handler={DetailPage} />
    <Router.Route name='about' path='/about' handler={About} />
    // Add the new route here:
    
  </Router.Route>
);
```

Like with other routing libraries, pairing a _path with a handler_ (any React component) is enough, though  using name helps generating routes but not obligatory.

If you want to know more about routing consult with its documentation here: https://github.com/rackt/react-router/tree/0.13.x

### Add a handler
 
Now you have a route but not a handler. Go to `public/views` directory and touch a file called after the new component or page, like `about.jsx`. Create a React class and add it to `module.exports` –– or better export it using [ES6 export](https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Statements/export). 

```javascript
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
```

This component will appear in the context of the `layout.jsx` much like template inheritence because the new route was defind inside the first `Router.Router`. 

This is it, you have a new page with a new component. And because any component can contain further components the new page can conatain almost anything.

And by the way its isomorphic: the browser gets a fully rendered markup that comes to life by react after the page loads. 

### Flux, models and persisting

If you happen to use any model in your application like users or carts, a full but really simple flux implementation is at your finger. Flux is a really hot buzzword these days but actually its not as complicated as people say. 

In a flux implementation, every user action (like a click on an element) fires an event passing some datas to the event manager. Then the event manager can tell the store to do something with those payload, for example add a new element to a list with its datas. 

The store is a wrapper object for the models used in the application. Only  the store allowed to update/mutate them.  

After the store mutates the model or itself, it fires an event, that tells every components to rerender themself. Any component that is subscribed to this 'rerender' event can refresh its state that in turn refreshes its DOM representation - if its really needed (React.js takes care of it with its shadow DOM).

In short flux secures that changes will flow always this way: UI Event -> Store mutation -> Store event -> UI rerendering  

So no more quirky direct dom manipulations on successfull ajax calls and no hidden ajax calls on exotic radio button events somewhere deeply hidden in the page's markup. 

If you need any model, you can access the store and get it like in the example:

```javascript
var MovieStore = require('../../src/stores/movieStore.js');

// ...and later in your component you 
      <ul>
          {this.state.movies.map(function(movie) {
            return (
              <li>
``` 

And if this component uses this store as its model, simply subscribe it to any events, eg. 'dom-change':

```javascript
componentDidMount: function() {
  EventsSingleton.emitter.on('dom-change', this.updateElement);
},
```  

Whenever some store operation fires a 'dom-change' event, this component will run `this.updateElement()` where the state can be updated directly from the store: 

```javascript
updateElement: function() {
  // Update state from the store
  var movies = MovieStore.getAll();
  
  // Important: this.setState({movies: MovieStore.getAll()}); won't work :(
  this.setState({movies: movies});
},
```  

Only one thing left: the store have to fire this 'dom-change' event after it mutates the store:

```javascript
const EventsSingleton = require('../service/eventsManager.js');


// Then somewhere in your store call dom-change event after you mutated the store and possible saved changes to the database:
EventsSingleton.emitter.emit('dom-change', getAll());
```

This way every model change takes place in the store, and every components can subscribe to any event and change their inner state. 

Which means that the model and the view layers of the application's view layer (yeah it's meta a little bit) are separated. And _separating concerns_ is the most important rule of maintanable code.  

### Server side tasks

Any React component can use any service modul before rendering.  If you need a pure json response, define a route and a handler in `src/server/routes.js` the Express way:

```javascript
const apiHandler = require('../service/testing.js');

module.exports = function routes(app) {
  app.get('/api', apiHandler);
};
```

## Testing

Jest is configured out of the box, see their tutorial for details: https://facebook.github.io/jest/docs/getting-started.html#content

Short: run `npm test`

## Todos

1. ~~integrate Jest (Facebook's testing environment)~~
2. create a Docker compose file with all tools installed 
3. integrate Redis (into stores maybe? or with some orm)
4. 404 page 
5. Sass

## Credits

All credits goes to the brilliant minds who wrote those packages that this boilerplate is based on. For details see package.json 