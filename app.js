const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

const app = express();
const tasksToDo = [];
let randomIdx = Math.floor(Math.random()*1000);

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
	let task = {
		title : req.body.title,
		description : req.body.description
	}; 
	tasksToDo.push(task);
	res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server etd. at port 3000");
});