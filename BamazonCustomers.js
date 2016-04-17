var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'darksouls',
	database: 'bamazon'

});

connection.connect(function(err){
	if(err){
		console.log(err);
	}
	console.log('connected');
	
});




function bamazon(){


	connection.query("SELECT * FROM Bamazon.Products WHERE  StockQuantity > 0 ", function(err, results){
		if(err) throw err;

	
		console.log(results);
	
	});
	
	
	
}
bamazon();

