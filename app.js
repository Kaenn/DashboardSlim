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

app.post('/RemoteControle/add-message', function (req, res) {
	console.log(req.body);
	
	if ('undefined' == typeof req.body.message) {
		res.respond('[Chat Message must be defined]', 400);
	} else if ('undefined' == typeof req.body.auteur) {
		res.respond('[Chat Auteur must be defined]', 400);
	} else {
		io.sockets.emit('add-message', req.body.auteur,'12sec ago',req.body.message);
		
		res.respond("[success add message on chat]",200);
	}
});

app.post('/RemoteControle/update-gauge', function (req, res) {
	console.log(req.body);
	
	if ('undefined' == typeof req.body.val) {
		res.respond('[Gauge Val must be defined]', 400);
	} else {
		io.sockets.emit('update-gauge', req.body.val);
		
		res.respond("[success update gauge]",200);
	}
});


var server = require('http').Server(app);

var io = require('socket.io')(server);
server.listen(8333);

/*setInterval(function () {
    io.sockets.emit('add-message', 'ginizan','12sec ago','glenn ok');
 }, 5000);*/
 
io.sockets.on('connection', function(client) {
  console.log('connecter');
});