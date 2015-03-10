$(document).ready(function () {
  var socket = io.connect('http://localhost:8333');
  socket.on('message', function (data) {
	var obj = JSON.parse(data);
	if(obj.message) {
	  $('#message').text(obj.message);
	} else {
	  $('#timestamp').text(obj.timestamp);
	  $('#clients').text(obj.clients);
	}
  });
  $("#poke").click(function() { socket.emit('message',"Poke !"); });
});