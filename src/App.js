import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Students from './Students';
import Home from './containers/Home';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
