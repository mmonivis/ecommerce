import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GetCart from '../actions/GetCart';
import ProductTableRow from '../components/ProductTableRow';
import $ from 'jquery';

class Cart extends Component{
	constructor(props) {
		super(props);
		this.makePayment = this.makePayment.bind(this);
	}

	componentDidMount() {
		if(this.props.loginInfo.token !== undefined){
			this.props.getCart(this.props.loginInfo.token)
		}else{

		}
	}

	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_EEfzI9Nh9jpG99fo2qstrDjN',
            locale: 'auto',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/2783-200.png',
            token: (token) => {
                console.log(token)
                var theData = {
                    amount: this.props.cartInfo.totalPrice * 100,
                    stripeToken: token.id,
                    userToken: this.props.loginInfo.token
                }
                $.ajax({
                    method: 'POST',
                    url: window.hostAddress + '/stripe',
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {
                        this.props.history.push('/thankyou')
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Continue to checkout',
            amount: this.props.cartInfo.totalPrice * 100
        })
    }

	render(){

		var cartArray = [];
		if(this.props.cartInfo.products !== undefined){
			this.props.cartInfo.products.map((product,index)=>{
				console.log(product)
				cartArray.push(
					<ProductTableRow 
						key={index} 
						product={product} 
						addToCart={null} 
						loggedIn={false}
						token={null}
					/>
				)
			})
		}else if(this.props.loginInfo.token == undefined){
			return(
				<div className="text-center">
					<h3>Your cart is empty! Start shopping or <Link to="/login">login here</Link></h3>
				</div>
			)
		}

		console.log(this.props.cartInfo)
		return(
			<div className="cart-page">
				<div className="cart-header col-md-6"><h1>Cart</h1></div>
				<div className="pay-now col-md-6">
					<div className="total-price">
						Your order total is: ${this.props.cartInfo.totalPrice}
					</div>
					<button className="btn btn-success" onClick={this.makePayment}>
						Pay now!
					</button>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th className="cart-head">Product Name</th>
							<th className="cart-head">Model Scale</th>
							<th className="cart-head">Made By</th>
							<th className="cart-head">Description</th>
							<th className="cart-head">In Stock</th>
							<th className="cart-head">Your Price!</th>
							<th className="cart-head">MSRP</th>
						</tr>
					</thead>									

					<tbody>
						{cartArray}
					</tbody>
				</table>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		loginInfo: state.registerReducer,
		cartInfo: state.cartReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCart: GetCart
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);