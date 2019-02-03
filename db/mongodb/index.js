// 

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');  
});

let movieSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  poster_path: String,
  release_date: String,
  popularity: Number,
  genre_ids: Array
});

let Movie = mongoose.model('Movie', movieSchema);

let saveMovie = (data) => {
  let newMovie = new Movie({
    id: data.id,
    title: data.title,
    poster_path: data.poster_path,
    release_date: data.release_date,
    popularity: data.popularity,
    genre_ids: data.genre_ids
  });
  newMovie.save(); // save movie to mongoDB database
}

module.exports = {
  db: db,
  Movie: Movie,
  saveMovie: saveMovie
}