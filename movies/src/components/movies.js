import React, { Component } from 'react';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded:false,
      movieData: {}
    }
  }
  componentDidMount() {
    //https://api.themoviedb.org/3/movie/popular?api_key=d6da653ced0e74082d0f44e5f537d79b&language=en-US&page=1
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

    render() {
      const { error, isLoaded, movieData } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul className="movie-list">
            {movieData.map(item => (
              <li key={item.id}>
                <img src={"https://image.tmdb.org/t/p/w200/" + item.poster_path} />
                <a>View Details</a>
              </li>
            ))}
          </ul>
        );
      }
    }
  }

  export default Movies;