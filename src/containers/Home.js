import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			productlines: []
		}
	}

	componentDidMount() {
		// get all the productline info... we already set this up in the navbar
		$.getJSON(window.hostAddress+'/productlines/get',(productlinesData)=>{
	      // console.log(productlinesData);
	      this.setState({
	        productlines: productlinesData
	      });
	    });
	}

	render(){

		// Temp var to store our <link>
	    const shopMenu = [];
	    // Map through this.state.productlines. First render, will not loop (because array is empty)
	    this.state.productlines.map((pl,index)=>{
	      // console.log(pl)
	      shopMenu.push(
	        <Link key={index} to={`/shop/${pl.link}`}>{pl.productLine}</Link>
	      )
	    })

		const plImages = [];
		// loop through the productlines from DB.
		this.state.productlines.map((row,index)=>{
			plImages.push(
				<div key={index} className="pl-images col-md-4">
					<Link to={`/shop/${row.link}`}><img src={row.image} /></Link>
					<div className="text">{row.productLine}</div>
				</div>
			)
		})
		return(
			<div className="home-page col-md-12">
				<div className="home-header"><h1>Featured Products</h1></div>
				<div className="shop-links col-md-12">
					<h2>Shop</h2>
	                <ul>
	                  <li>
	                    { /* Drop in the array of <Link> created above */ }
	                    {shopMenu}
	                  </li>
	              	</ul>
				</div>
				<div className="pl-categories col-md-12">
					{plImages}
				</div>
			</div>
		)
	}
}

export default Home;