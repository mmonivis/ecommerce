import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Slick from './components/Slick'

import Students from './Students';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
import Register from './containers/Register';
import Login from './containers/Login';
import ProductLine from './containers/ProductLine';
import Cart from './containers/Cart';

class App extends Component {
  render() {
    return (
      <Router>
      	<div className="App">
      		<Navbar />
          <Route exact path="/" component={Slick} />
      		<div className="container main">
      			<Route exact path="/" component={Home} />
      			<Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path ="/shop/:productLine" component={ProductLine} />
            <Route path ="/cart" component={Cart} />
      		</div>
      	</div>
      </Router>
    );
  }
}

export default App;
