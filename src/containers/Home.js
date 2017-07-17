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
		const plImages = [];
		// loop through the productlines from DB.
		this.state.productlines.map((row,index)=>{
			plImages.push(
				<div key={index} className="col-sm-4 col-md-3 pl-images">
					<Link to={`/shop/${row.link}`}><img src={row.image} /></Link>
					<div className="text">{row.productLine}</div>
				</div>
			)
		})
		return(
			<div className="home-header">
				<h1>{plImages}</h1>
			</div>
		)
	}
}

export default Home;