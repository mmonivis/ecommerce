import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Slick from './Slick';
import $ from 'jquery';

class NavBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      productlines: []
    }
  }

  componentDidMount() {
    // go get all productlines from the DB.
    $.getJSON(window.hostAddress+'/productlines/get',(productlinesData)=>{
      console.log(productlinesData)
      this.setState({
        productlines: productlinesData
      })
    })
  }

  render(){
    // temp var to shore our Links
    const shopMenu = [];
    // map through this.state.productlines. first render will not loop because array is empty
    this.state.productlines.map((pl,index)=>{
        shopMenu.push(
            <Link key={index} to={`/shop/${pl.link}`}>{pl.productLine}</Link>
        )
    })

    // shopMenu = [
    //     <Link to="/shop/cars">Cars</Link>
    //     <Link to="/shop/motorcycles">Motorcycles</Link>
    //     <Link to="/shop/planes">Planes</Link>
    //     <Link to="/shop/ships">Ships</Link>
    //     <Link to="/shop/trains">Trains</Link>
    //     <Link to="/shop/trucks-buses">Trucks/Buses</Link>
    // ]

    return(
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">ClassicModels</Link>
        </div>
        <div className="container-fluid navbar-white navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
              <li className="dropdown">
                <Link to="/shop"><i className="arrow down" /> Shop</Link>
                <ul>
                  <li className="dropdown-links">
                    { /* Drop in the array of <Link> created above */ }
                    {shopMenu}
                  </li>
                </ul>
              </li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <ul className="nav navbar-nav float-right">
              <li className="text-right"><Link to="/login">Login</Link></li>
              <li className="text-right"><Link to="/register">Register</Link></li>
              <li className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>
           </ul>
        </div>
      </nav>
          <Route exact path="/" component={Slick} />
        </div>
  )
  }
}

export default NavBar;
