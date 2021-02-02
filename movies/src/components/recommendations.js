import React, { Component } from 'react';
import {getFullMonth} from '../utils/utils.js';
import {useHistory,
    Route,
    Link
  } from "react-router-dom";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded:false,
        recs: {}
      }
  }

  fetchRecs(){
    //https://api.themoviedb.org/3/movie/${this.props.movieId}/recommendations?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1
    fetch(`https://api.themoviedb.org/3/movie/${this.props.movieId}/recommendations?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1`)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
                isLoaded: true,
                recs: result.results
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
      .then(console.log("Details Fetched"))
  }
  checkPath(path){
    if(path == undefined || path.length < 1){
      return "https://www.flicks.com.au/img/placeholders/poster-placeholder.jpg";
    }else{
      return "https://image.tmdb.org/t/p/w200/" + path;
    }
  }

  componentDidMount() {
    this.fetchRecs();
  }
    render() {
      const { error, isLoaded, movieDetail } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="loading-text">Loading...</div>;
      } else {
        return (
          <div>
            <div className="list-container">
              <ul className="movie-list">
                {this.state.recs.slice(0, 5).map(rec => (
                  <li key={rec.id}>
                    <img src={this.checkPath(rec.poster_path)} />
                    <Link to={`/movie/${rec.id}`}>View Details</Link>
                  </li>
                ))}
              </ul>
            </div>  
          </div>
        );
      }
    }
  }

  export default Recommendations;