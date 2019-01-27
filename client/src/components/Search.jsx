import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
  }


  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
      .then((res) => {
        let result = res.data.map((genre) => {
          return genre.name;
        });
      this.setState({ genres: result })
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onClick={()=> {this.getGenres()}}>
          <option>Select Genre</option>
          { this.state.genres.map((genre) => <option value={genre} key={genre}>{genre}</option>) }
        </select>
        <br/><br/>

        <button onClick={() => {this.props.getMovies()}}>Search</button>

      </div>
    );
  }
}

export default Search;