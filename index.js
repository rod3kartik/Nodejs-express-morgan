const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname ='localhost';
const port = 3000;
const app = express(); //A way of saying that our application will be using Express.

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next) =>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
});

app.get('/dishes', (req,res,next) =>{
	res.end("Will send all the dishes to you");
});

app.post('/dishes', (req,res,next) =>{
	res.end("Will add the dish: " + req.body.name + 'with details:' + req.body.description);
});

app.put('/dishes', (req,res,next) =>{
	res.statusCode = 403;
	res.end("Operation not supported.");
});

app.delete('/dishes', (req,res,next) =>{
	res.end("Deleting all the dishes");
});

app.get('/dishes/:dishId', (req,res,next) =>{
	res.end("Will send details of the dish" + req.params.dishId + "to you!");
});

app.post('/dishes/:dishId', (req,res,next) =>{
	res.statusCode=403;
	res.end("Not supported");
});

app.put('/dishes/:dishId', (req,res,next) =>{
	res.write("Updating the dish: " + req.params.dishId);
	res.end("Will update the dish: " + req.body.name + "with details" + req.body.description);
});

app.delete('/dishes/:dishId', (req,res,next) =>{
	res.end("Deleting dish" + req.params.dishId);
});


app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1> This is express server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port,hostname, () =>{
	console.log(`server running at http://${hostname} at port ${port}`);
});