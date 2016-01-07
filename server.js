var express = require('express'),
	app	= express(),
	logger = require('morgan'),
	path = require('path'),
	port = process.env.PORT || 3000

app.use(logger('dev'))

//put .css, .js, and .html files in public folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
	console.log('sending index')
	res.sendFile(__dirname + 'index.html')
})

app.listen(port, function(){
	console.log('listening on port' + port)
})