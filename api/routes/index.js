var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// Include config file. Up from routes, down into config, config.js
var config = require('../config/config');

// include bcrypt for hashing and checking password
var bcrypt = require('bcrypt-nodejs');
// include rand-token for generating user token
var randToken = require('rand-token');

// set up the connection with options
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

// actually make the connection
connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productlines/get', (req,res)=>{
	const selectQuery = "SELECT * FROM productlines"
	connection.query(selectQuery,(error,results,fields)=>{
		if(error){
			res.json(error);
		}else{
			res.json(results);
		}
	})
})

router.post('/register', (req,res)=>{
	const name = req.body.name;
	const email = req.body.email;
	const accountType = 'customer';
	const password = bcrypt.hashSync(req.body.password);
	// console.log(password);
	const city = req.body.city;
	const state = req.body.state;
	const salesRep = req.body.salesRep;
	const creditLimit = 16000000

	// We want to insert the user into two tables (users and customers)
	// Users needs the customerNumber from the Customers table
	// Therefore, we need to insert the user into Customers first
	// Get the ID created by that insert
	// THEN, insert the user into Users.

	// Customers insert query
	var insertIntoCust = "INSERT INTO customers (customerName,city,state,salesRepEmployeeNumber,creditLimit) VALUES (?,?,?,?,?)";
	// Run the query (for now, set the salesRep to 1337)
	connection.query(insertIntoCust,[name,city,state,1337,creditLimit],(error, results)=>{
		// Get the ID that was used in the customers insert
		const newID = results.insertId
		// Get the current timestamp
		var currTimeStamp = Date.now() / 1000;
		// Set up a token for this user. We will give this back to react
		var token = randToken.uid(40);
		// Users insert query. Use error2 and results2 because are alredy used results and error
		var insertQuery = "INSERT INTO users (uid,type,password,created,token) VALUES (?,?,?,?,?)";
		// Run the query
		connection.query(insertQuery,[newID,accountType,password,currTimeStamp,token],(error2, results2)=>{
			if(error2){
				res.json({
					msg: error2
				});
			}else{
				res.json({
					msg: "userInserted",
					token: token
				})
			}
		});
	});
})

module.exports = router;
