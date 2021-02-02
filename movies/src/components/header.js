import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return <div id="mainHeader">
        <h1>The Movies!</h1>
        <nav>
          <Link to="/">
            <h3>Home</h3>
          </Link>
        </nav>
      </div>
      
    }
  }

  export default Header;