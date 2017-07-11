import React, { Component } from 'react';

class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Classic Models</a>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">For Sale</a></li>
                  <li><a href="#">Trade Ins</a></li>
                </ul>
              </div>
            </nav>
        )
    }
};

export default Navbar;
