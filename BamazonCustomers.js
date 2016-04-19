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
			console.log("Price: $" + results[i].Price);
			console.log("StockQuantity: " + results[i].StockQuantity);
			console.log("---------------------------------------------".green);
			console.log("\n");
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

