const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ToDoTasks', { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
	title : String,
	description : String
});

const Task = new mongoose.model('Task',taskSchema);

const app = express();
const tasksToDo = [];
Task.find({}, function(err,tasks){
	if(err)
		console.log(err);
	if(tasks.length > 0 && tasks.length !== null){
		for(let i = 0; i < tasks.length; i++)
			tasksToDo.push(tasks[i]);
	}
});
let randomIdx = Math.floor(Math.random()*100);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine","ejs");



app.get("/",function(req, res){
	const url = "https://type.fit/api/quotes";
	let quote;

	https.get(url, function (response) {
    	const chunks = []
	    response.on('data', function (chunk) {
	      chunks.push(chunk)
	    })

	    response.on('end', function () {
	      const data = Buffer.concat(chunks)
	      var quoteData = JSON.parse(data)
	      quote = quoteData[randomIdx].text;
	      res.render("tasks", {displayQuote : quote, tasksLeft : tasksToDo});
	    })
    })
});

app.post("/", function(req, res){ 
	let newTask = new Task({
		title : req.body.title,
		description : req.body.description
	});
	newTask.save(function(err){
		if(err)
			console.log(err);
		else
			console.log("Successfully added a new Article");
	});
	tasksToDo.push(newTask);
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server etd. at port 3000");
});