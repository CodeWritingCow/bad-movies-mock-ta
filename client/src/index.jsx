import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.post(`/search/${genre}`)
      .then((response) => {
        this.setState({movies: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveMovie(movie) {
    // same as above but do something diff
    console.log('Moo: saveMovie() ', movie);    
    // axios.post(`/save`)
    //   .then((response) => {
    //     this.setState({})
    //   })
  }

  deleteMovie(movie) {
    // same as above but do something diff
    console.log('Moo: deleteMovie() ', movie);
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies} />
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
                  showFaves={this.state.showFaves}
                  saveMovie={this.saveMovie}
                  deleteMovie={this.deleteMovie} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));