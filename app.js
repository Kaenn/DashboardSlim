var express = require('express');
 
var app = express();
var swig=require('swig');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

// Monkey patch pour controler les format et params des requetes
require('./response');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));
// view engine setup
// utilisation du moteur de swig pour les .html
app.engine('html', swig.renderFile); 
// utiliser le moteur de template pour les .html
app.set('view engine', 'html'); 
// dossier des vues
app.set('views', path.join(__dirname, 'views')); 



app.get('/', function(req, res, next){
	res.render('DashboardSlim');
});

var server = require('http').Server(app);

var io = require('socket.io')(server);
server.listen(8333);

io.sockets.on('connection', function(client) {
	console.log('connecter');
});






var chat=require('./plugin/chat');
chat.router(app,io.sockets);

var gauge=require('./plugin/gauge');
gauge.router(app,io.sockets);

var progressBar=require('./plugin/progressBar');
progressBar.router(app,io.sockets);


