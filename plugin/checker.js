var router=function(app,clients){
	app.post('/RemoteControle/update-checker', function (req, res) {
		if ('undefined' == typeof req.body.label) {
			res.respond('[Gauge Label must be defined]', 400);
		} else if ('undefined' == typeof req.body.isCheck) {
			res.respond('[Gauge isCheck must be defined]', 400);
		} else {
			clients.emit('update-checker', req.body.label, req.body.isCheck);
			
			res.respond("[success update checker]",200);
		}
	});
}

exports.router = router;