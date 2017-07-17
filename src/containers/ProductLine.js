import React, {Component} from 'react';
import $ from 'react-router-dom';

class ProductLine extends Component{
	constructor(props) {
		super(props);
		this.state = {
			productList: []
		}
	}

	componentDidMount() {
		// console.log(this.props.match)
		const pl = this.props.match.params.productLine
		// console.log(pl)
		const url = window.hostAddress + `/productlines/${pl}/get`
		$.getJSON(url,(data)=>{
			console.log(data);
		})
	}

	render()
		return(
			<h1>Product List Page</h1>
		)
}

export default ProductLine;