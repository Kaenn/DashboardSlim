var router=function(app,clients){
	app.post('/RemoteControle/update-progressbar', function (req, res) {
		if ('undefined' == typeof req.body.value) {
			res.respond('[ProgressBar value must be defined]', 400);
		} else {
			clients.emit('update-progressBar', req.body.value);
			
			res.respond("[success update ProgressBar]",200);
		}
	});
}

exports.router = router;