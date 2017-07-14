import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Students from './Students';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
import Register from './containers/Register';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <Router>
      	<div className="App">
      		<Navbar />
      		<div className="container main">
      			<Route exact path="/" component={Home} />
      			<Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
      		</div>
      	</div>
      </Router>
    );
  }
}

export default App;
