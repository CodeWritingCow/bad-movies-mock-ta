var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var { saveMovie } = require('../db/mongodb/index');
var { Movie } = require('../db/mongodb/index');

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  // send back
  apiHelpers.getGenreList()
  .then((data) => {
    res.send(data);
  });
});

app.post('/search/:genre', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie

  // and sort them by votes (worst first) using the search parameters in themoviedb API
  apiHelpers.getMoviesByGenre(req.params.genre)
  .then((data) => {
    res.send(data);
  });
});

// get all favorite movies from database
app.get('/favorites', function (req, res) {
  let query = Movie.find({});
      query.exec(function (err, movies) {
        if (err) {
          console.log(err);
        } else {
          // console.log(movies);
          res.send(movies);
        }
      }); 
})


app.post('/save', function(req, res) {

  // save movie as favorite
  // console.log(req.body);
  saveMovie(req.body);

  let query = Movie.find({});
    query.exec(function (err, response) {
      if (err) {
        console.log(err);
      } else {
        let allFavorites = Movie.find({});
              allFavorites.exec(function (err, movies) {
                if (err) {
                  console.log(err);
                } else {
                  // console.log(movies);
                  res.send(movies);
                }
              });      
      }
    });
    
});

app.post('/delete', function(req, res) {

  //remove movie from favorites
  console.log(req.body);
  Movie.findOneAndDelete({id: req.body.id}, function (err, response) {
    if (err) {
      console.log(err);
    } else {
      let query = Movie.find({});
      query.exec(function (err, movies) {
        if (err) {
          console.log(err);
        } else {
          // console.log(movies);
          res.send(movies);
        }
      });      
    }
  });



});


//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

const movieRoutes = require('./routes/movieRoutes.js');

//Use routes
app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
