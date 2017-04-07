//Jeffrey Stewart
//Task Manager / To-Do List Application
//Add and Delete Tasks


//Require Node Modules:
var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

var entries = []; //todo entries held in array
app.locals.entries = entries;
var nextID = 1;


//Constructor function for a todoItem
var todoItem = function (t, c, d) {
	this.id = nextID++;
	this.task = t;
	this.type = c;
	this.dueDate = d;
}

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


//index.ejs file to display
app.get("/", function(req, res) {
	res.render("index");
});

//ADD
app.post("/add", function(req, res){
	
	//Check Form Complete
	if(!req.body.task || !req.body.type){
		res.status(400).send("Entries must have task, type, and due date.");
		return;
	}
	
	//Push Form Contents to entries
	entries.push({
		"id": nextID,
		"task": req.body.task,
		"type": req.body.type,
		"dueDate": req.body.datepicker,
		"published": new todoItem(req.body.task, req.body.type, req.body.datepicker)
	});
	res.redirect("/");
});

//REMOVE
app.post("/remove", function(req, res) {
	//remove item according to id given by checkboxes
	var len;
	var lenJ;
	var index;
	var removable = [];
	if(req.body.entry){
		//check for return type string or array (affects .length function later)
		var variable = typeof(req.body.entry);
	
		//if string, move string to array[0]
		if(variable == 'string'){
			len = 1;
			removable[0] = req.body.entry;
		}
		//if array, copy array into removable array
		else{
			len = req.body.entry.length;
			for(var k = 0; k < len; k++){
				removable[k] = req.body.entry[k];
			}
		}
	
		//find identical ids and remove them from entries array
		for(var i = 0; i<len; i++){
			for(var j=0, lenJ = entries.length; j<lenJ; j++){
				if(removable[i] == entries[j].id){
					entries.splice(j, 1);
					//index = j;
					break;
				}
			}	
		}
	}
	res.redirect("/");
});

app.use(function(req, res) {
	res.status(404).render("404");
});

http.createServer(app).listen(3000, function() {
	console.log("To-Do App Started...");
});