var colors = require('colors');
var prompt = require('prompt');
var mysql = require('mysql');

var connection = mysql.createConnection({
     host     : 'localhost', //for now, this will always be localhost
     user     : 'root',  // this will be whatever user you use to connect to mysql
     password : 'darksouls',  // this is the password for the 'user' above
     database : 'bamazon'  // this is a database which you have on your install of mysql
   });

connection.connect(function(err){
	if(err){
		console.log(err);
	}
	
	
});



function manager(){
	console.log("----------  Welcome to Bamazon Manager  ---------".green);
	console.log("-------------      Menu     ----------------".green);
	console.log("1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product".green);

	prompt.start();
	prompt.get(['selection'], function (err, result) {
    	if(result.selection == 1 ){
    		viewProducts();
    	}else if(result.selection == 2){
    		lowInventory();
    	}else if (result.selection ==3){
    		addInventory();
    	}
    
  });

}

function viewProducts(){

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
	});
}

function lowInventory(){
	connection.query("SELECT * FROM Bamazon.Products WHERE StockQuantity < 5 ", function(err, results){

	if(results.length == 0){
		console.log("We are fully stocked!");
	}else{	

		console.log("Bamazon.com's Low Inventory List---".underline.red);
		
		for (var i = 0; i < results.length; i++) {
			console.log("Id: " + results[i].ItemID);
			console.log("Product: " + results[i].ProductName);
			console.log("Deparment: " + results[i].DeparmentName);
			console.log("Price: $" + results[i].Price);
			console.log("StockQuantity: " + results[i].StockQuantity);
			console.log("---------------------------------------------".green);
			console.log("\n");
		}
	}

	});
}

function addInventory(){

	console.log("Enter id of Item and Quatnity that you would like to add")
	prompt.get(['productId','Quantity'],function(err,result){
		connection.query("SELECT * FROM Bamazon.Products WHERE ItemID= '" +result.productId +"'", function(err, rows){
			var newquant = parseInt(rows[0].StockQuantity) + parseInt(result.Quantity);
			connection.query("UPDATE Products SET StockQuantity ="+ newquant +" WHERE ItemID= " + result.productId);
			console.log(newquant);
		
		});

		
	});
}


manager();