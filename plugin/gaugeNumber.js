var router=function(app,clients){
	app.post('/RemoteControle/update-gaugeNumber', function (req, res) {
		if ('undefined' == typeof req.body.operator) {
			res.respond('[Gauge Operator must be defined]', 400);
		} else if ('undefined' == typeof req.body.operand) {
			res.respond('[Gauge Operand must be defined]', 400);
		} else {
			clients.emit('update-gaugeNumber', req.body.operator, req.body.operand);
			
			res.respond("[success update gaugeNumber]",200);
		}
	});
}

exports.router = router;