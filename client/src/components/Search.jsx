import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      value: 'Select Genre'
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
      .then((res) => {
      this.setState({ genres: res.data })
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

        <select value={this.state.value} onClick={()=> {this.getGenres()}} onChange={this.handleChange}>
          <option value='Select Genre'>Select Genre</option>
          { this.state.genres.map((genre) => <option value={genre.id} key={genre.name}>{genre.name}</option>) }
        </select>
        <br/><br/>

        <button onClick={() => {this.props.getMovies(this.state.value)}}>Search</button>

      </div>
    );
  }
}

export default Search;