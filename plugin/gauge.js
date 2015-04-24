var router=function(app,clients){
	app.post('/RemoteControle/update-gauge', function (req, res) {
		if ('undefined' == typeof req.body.val) {
			res.respond('[Gauge Val must be defined]', 400);
		} else if ('undefined' == typeof req.body.id) {
			res.respond('[Gauge Id must be defined]', 400);
		} else {
			clients.emit('update-gauge', req.body.val, req.body.id);
			
			res.respond("[success update gauge]",200);
		}
	});
}

exports.router = router;