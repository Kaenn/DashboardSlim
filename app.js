var express = require('express');
 
var app = express();
var swig=require('swig');
var path = require('path');

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

setInterval(function () {
    io.sockets.emit('add-message', 'ginizan','12sec ago','glenn ok');
 }, 5000);
 
io.sockets.on('connection', function(client) {
  console.log('connecter');
});