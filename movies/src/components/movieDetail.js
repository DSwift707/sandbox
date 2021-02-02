import React, { Component, useEffect } from 'react';
import {getFullMonth} from '../utils/utils.js';
import Recommendations from './recommendations.js';
class MovieDetail extends Component {
  constructor(props) {
    super(props);
    // Bind the this context to the handler function
   
    this.state = {
        error: null,
        isLoaded:false,
        movieDetail: {}
      }
  }

  fetchDetails(){
    //https://api.themoviedb.org/3/movie/popular?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1
    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US`)
      .then(res => res.json())
      .then(
        (result) => {
         this.formatResults(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            messageShown: false
          });
        }
      )
      .then(console.log("Details Fetched"))
  }
  //Here we'll ensure that values exist for the key information
  //that we want to use in the template
  formatResults(results,error){
    if(results !== undefined){
        //Define fallback defaults here
        //Converting all of these to strings that we want to display
        var title = "";
        var imageUrl = "";
        var tagline = "";
        var overview = "";
        var releaseDate = "Not Specified";
        var genres = "";
        var year = "";

        if(results.title !== undefined && results.title.length > 0){
            title = results.title;
        }
        if(results.backdrop_path !== undefined && results.backdrop_path.length > 0){
            imageUrl = results.backdrop_path;
        }
        if(results.tagline !== undefined && results.tagline.length > 0){
            tagline = results.tagline;
        }
        if(results.overview !== undefined && results.overview.length > 0){
            overview = results.overview;
        }
        if(results.release_date !== undefined && results.release_date.length > 0){
            var date = new Date(results.release_date);
            if(date !== undefined){
                // Would normally use momentjs here for formatting
                releaseDate = "Released: " +  getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
                year = `(${date.getFullYear()})`;
            }
        }
        if(results.genres !== undefined && results.genres.length > 0){
            for(const i in results.genres){
                var genre = results.genres[i];
                genres += genre.name + ", ";
            }
            genres = genres.replace(/,\s*$/, "");
        }
        else{
            genres = "Not Specified";
        }

        results.title = title;
        results.backdrop_path = imageUrl;
        results.tagline = tagline;
        results.overview = overview;
        results.release_date = releaseDate;
        results.genres = genres;
        results.year = year;

        this.setState({
            isLoaded: true,
            movieDetail: results
          });



    }else{
        //Double catchall for errors and undefineds
        this.setState({
            isLoaded: true,
            error: {
                message: "Uh Oh! We couldn't find this movie."
            }
        });
    }
  }


  componentDidMount() {
    this.fetchDetails();
    
  }
//   componentWillUpdate (prevProps, prevState) {
//     this.fetchDetails(); 
//   }

    render() {
      const { error, isLoaded, movieDetail } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="loading-text">Loading...</div>;
      } else {
        return (
          <div className="movie-details-container">
              <h1>{movieDetail.title} <span className="micro-header">{movieDetail.year}</span></h1>
              <img className="movie-backdrop" src={"https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path} />
              <p className="tagline">{movieDetail.tagline}</p>
              <p className="movie-description">{movieDetail.overview}</p>
              <p className="genres sub-detail">{movieDetail.genres}</p>
              <p className="release-date sub-detail">{movieDetail.release_date}</p>
              <h3>Recommendations</h3>
              <Recommendations movieId={movieDetail.id} />
              
          </div>
        );
      }
    }
  }

  export default MovieDetail;