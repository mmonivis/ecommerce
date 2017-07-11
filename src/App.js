import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Students from './Students';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import Register from './containers/Register';

class App extends Component {
  render() {
    return (
      <Router>
      	<div className="App">
      		<Navbar />
      		<div className="container main">
      			<Route exact path="/" component={Home} />
      			<Route exact path="/register" component={Register} />
      		</div>
      	</div>
      </Router>
    );
  }
}

export default App;
