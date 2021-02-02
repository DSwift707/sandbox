import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded:false,
      movieData: {}
    }
  }
  searchMovies(value){
    if(value == undefined || value.length < 1){
      this.fetchPopular();
    }else{
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&query=${value}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movieData: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .then(console.log)
    }
  }
  fetchPopular(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movieData: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .then(console.log)
  }
  checkPath(path){
    if(path == undefined || path.length < 1){
      return "https://www.flicks.com.au/img/placeholders/poster-placeholder.jpg";
    }else{
      return "https://image.tmdb.org/t/p/w200/" + path;
    }
  }
  componentDidMount() {
    //https://api.themoviedb.org/3/movie/popular?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1
    this.fetchPopular();
  }

    render() {
      const { error, isLoaded, movieData } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="loading-text">Loading...</div>;
      } else {
        return (
          <div>
            <div className="search-bar">
              <label>Search</label>
              <input type="text" onChange={(e) => this.searchMovies(e.target.value)}></input>
            </div>
            <div className="list-container">
              <ul className="movie-list">
                {movieData.map(item => (
                  <li key={item.id}>
                    <img src={this.checkPath(item.poster_path)} />
                    <Link to={`/movie/${item.id}`}>View Details</Link>
                  </li>
                ))}
              </ul>
            </div>  
          </div>
        );
      }
    }
  }

  export default Movies;