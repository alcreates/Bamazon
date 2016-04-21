var mysql = require('mysql');
var prompt = require('prompt');
var color = require('colors');
var pad = require('pad');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'darksouls',
	database: 'bamazon'

});
// to use. 
//process.stdout.write();
//pad npm package;

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
		process.stdout.write(pad("Id", 8));
		process.stdout.write(pad("Product",18));
		process.stdout.write(pad("Deparment",12));
		process.stdout.write(pad("Price", 8));
		process.stdout.write(pad("StockQuantity"));
		process.stdout.write("\n");
		
		for (var i = 0; i < results.length; i++) {
			process.stdout.write(" " + pad(results[i].ItemID.toString(),6));
			process.stdout.write(" " + pad(results[i].ProductName,18));
			process.stdout.write(" " + pad(results[i].DeparmentName,12));
			process.stdout.write(" " + results[i].Price);
			process.stdout.write(" " + results[i].StockQuantity);
			process.stdout.write("---------------------------------------------".green);
			process.stdout.write("\n");
		}
	
	var orderedId = null;
	var orderedQuanity = null;
console.log("Please enter the id and quantity of your order: ".blue);
	prompt.start();
	prompt.get(['id', 'quantity'], function (err, result) {
     
    
    orderedId = result.id;
    orderedQuanity = result.quantity;

    
    if(orderedId != null && orderedQuanity != null){

		

		connection.query("SELECT * FROM Bamazon.Products WHERE ItemID='" + orderedId + "'", function (err, rows){
			if (err) {
           return callback(err);
       }
       if (rows.length == 0) {
           var err = new Error();
           err.message = "No data found for '" + orderedId + "'";            
           return callback(err);
       }

       	if (rows[0].StockQuantity >= orderedQuanity){
       		var total = rows[0].Price * orderedQuanity;
       		var totalLeftInStock = rows[0].StockQuantity - orderedQuanity;
       		console.log("Only " + totalLeftInStock + "left of this item!");
       		console.log("Thank you for ordering "+ rows[0].ProductName + "!");
       		console.log("Your total is $" + total);
       		connection.query("UPDATE Products SET StockQuantity = " + totalLeftInStock + " WHERE ItemId = " + rows[0].ItemID);
       			
       	} else{
       		console.log('sorry insufficient quantity');
       	}
       	

		});
	}
    
  	});

	
	
	});

	
	
	
	
}
bamazon();

// 'UPDATE Product SET StockQuantity = ? Where ItemId = ?',
// 									  [totalLeftInStock, itemId],
// 									  function (err, result) {
// 									    if (err) throw err;
// 										    process.stdout.write("\n"+pad(pad(3,itemId),6));
// 										 	process.stdout.write(" "+pad(prodName,20));
// 										 	process.stdout.write(" "+pad(6,unitPrice.toFixed(2)));
// 										 	process.stdout.write(" "+pad(10,userQty.toString()));
// 										 	process.stdout.write(" "+pad(12,totalCost));

// 										 	console.log("\n\n");

// 										 	process.exit();

// 									  }

