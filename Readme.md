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

* From public/views: `list.jsx, detail.jsx, addNew.jsx, about.jsx` 

* From public/routes.jsx: `remove/replace all Router.Route and Router.DefaultRoute`

* From src/stores: `remove MovieStore.js, and remove all require/import that points to this store`

## Todos

1. integrate Jest (Facebook's testing environment)
2. create a Docker compose file with all tools installed 
3. integrate Redis (into stores maybe? or with some orm)
4. 404 page 
5. Sass

## Credits

All credits goes to the brilliand minds who wrote these packages. 