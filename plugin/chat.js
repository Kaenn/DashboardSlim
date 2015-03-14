var router=function(app,clients){
	app.post('/RemoteControle/add-message', function (req, res) {
		if ('undefined' == typeof req.body.message) {
			res.respond('[Chat Message must be defined]', 400);
		} else if ('undefined' == typeof req.body.auteur) {
			res.respond('[Chat Auteur must be defined]', 400);
		} else {
			clients.emit('add-message', req.body.auteur,'12sec ago',req.body.message);
			
			res.respond("[success add message on chat]",200);
		}
	});
}

exports.router = router;