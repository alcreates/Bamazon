var mysql = require('mysql');
var prompt = require('prompt');
var color = require('colors');
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
		console.log("Bamazon.com's current selection---".underline.red);
		
		for (var i = 0; i < results.length; i++) {
			console.log("Id: " + results[i].ItemID);
			console.log("Product: " + results[i].ProductName);
			console.log("Deparment: " + results[i].DeparmentName);
			console.log("Price: " + results[i].Price);
			console.log("StockQuantity: " + results[i].StockQuantity);
			console.log("---------------------------------------------".green);
			console.log("\n");
		}
		
	
	});
	
	
	
}
bamazon();

