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
	});
});

router.get('/productlines/:productLines/get', (req,res)=>{
	// res.json({msg:"Test"})
	const pl = req.params.productLines;
	var plQuery = `SELECT * FROM productLines
	INNER JOIN products ON productlines.productLine = products.productLine
	WHERE link = ?`
	connection.query(plQuery, [pl], (error, results)=>{
		if (error) throw error;
		res.json(results);
	});
});

router.post('/register', (req, res)=>{
	console.log(req.body)

	const name = req.body.name;
	const email = req.body.email;
	const accountType = 'customer';
	const password = bcrypt.hashSync(req.body.password);
	const city = req.body.city;
	const state = req.body.state;
	const salesRep = req.body.salesRep
	const creditLimit = 16000000

	// We want to insert the user into 2 tables: Customers and Users.
	// Users needs the customerNumber from the Customers table.
	// Therefore, we need to insert the user into Customers first...
	// get the ID created by that insert, THEN insert the user into Users.

	// First, check to see if email already exists
	const checkEmail = new Promise((resolve, reject) => {
		const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
		connection.query(checkEmailQuery,[email],(error,results)=>{
			if(error) throw error;
			if(results.length > 0){
				reject({msg: "userAlreadyExists"});
			}else{
				// we dont care about results. Just that there isn't a match
				resolve();
			}
		})
	})

	checkEmail.then(
		// Customers insert query
		()=>{
			var insertIntoCust = "INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber, creditLimit) VALUES (?,?,?,?,?)"
			// Run the query (for now autoset the sales rep to 1337)
			connection.query(insertIntoCust,[name,city,state,1337,creditLimit],(error, results)=>{
				// Get the ID that was used in the customers insert
				const newID = results.insertId
				// Get the current timestamp
				var currTimeStamp = parseInt(Date.now() / 1000);
				// Set up a token for this user. We will give this back to React
				var token = randToken.uid(40);
				// Users insert query
				var insertQuery = "INSERT INTO users (uid,type,password,created,token,email) VALUES (?,?,?,?,?,?)";
				// Run the query. Use error2 and results2 because are already used results and error
				
				connection.query(insertQuery,[newID, accountType,password, currTimeStamp, token, email],(error2,results2)=>{
					if(error2){
						res.json({
							msg: error2
						})
					}else{
						res.json({
							msg: "userInserted",
							token: token,
							name: name
						});
					}
				});
			})
		}
	).catch(
		(error)=>{
			res.json(error)
		}
	)
})

router.post('/login',(req,res)=>{
	var email = req.body.email;
	var password = req.body.password;
	var checkLoginQuery = "SELECT * FROM users WHERE email = ?";
	connection.query(checkLoginQuery,[email], (error,results)=>{
		if(error) throw error;

		if(results.length == 0){
			// this email aint in the db
			res.json({
				msg: "badUsername"
			});
		}else{
			// The username is valid, see if the password is
			var checkHash = bcrypt.compareSync(password, results[0].password);
			// checkHash will be true or false
			if(checkHash){
				// This is the droid we're looking for
				// Log them in... i.e., create token, update it, send it back
				const updateToken = `Update users SET token=?,token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR)`
				var token = randToken.uid(40);
				connection.query(updateToken,[token],(error2,results2)=>{
					res.json({
						msg: "loginSuccess",
						name: results[0].name,
						token: token
					})
				})
			}else{
				// There aren't the droids we're looking for.
				// You don't want to sell me death sticks.
				// You want to go hopme and rethink your life. Bye.
				res.json({
					msg: 'wrongPassword'
				})
			}
		}
	})
})

module.exports = router;
