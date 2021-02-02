import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/header.js';
import Movies from './components/movies.js';
import MovieDetail from './components/movieDetail.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <div id="movies">
      <Header />
      <Switch>
        <Route path="/movie/:id"  component={(props) => <MovieDetail {...props} key={window.location.pathname}/>} />
        <Route path="/" exact component={Movies} />
      </Switch>
      
    </div>
  </Router>
  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
