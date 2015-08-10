function haveParam(params,need){
	for(var i=0; i < need.length; i++){
		if(typeof params[need[i]] == "undefined"){
			return false;
		}
	}
	
	return true;
}

var router=function(app,clients){
	app.post('/RemoteControle/create-alerte', function (req, res) {
		if(haveParam(req.body,["id","tache","projet","client","serveur","description","priorite"])){
			clients.emit('create-alerte',req.body.id,req.body.tache,req.body.projet,req.body.client,req.body.serveur,req.body.description,req.body.priorite);
			
			res.respond("[Success create alerte]",200);
		}else{
			res.respond('[Alerts param manquant]', 400);
		}
	});
	
	app.post('/RemoteControle/update-alerte', function (req, res) {
		if(haveParam(req.body,["id","tache","projet","client","serveur","description","priorite"])){
			clients.emit('update-alerte',req.body.id,req.body.tache,req.body.projet,req.body.client,req.body.serveur,req.body.description,req.body.priorite);
			
			res.respond("[Success update alerte]",200);
		}else{
			res.respond('[Alerts param manquant]', 400);
		}
	});
	
	app.post('/RemoteControle/remove-alerte', function (req, res) {
		if(haveParam(req.body,["id"])){
			clients.emit('remove-alerte',req.body.id);
			
			res.respond("[Success remove alerte]",200);
		}else{
			res.respond('[Alerts param manquant]', 400);
		}
	});
	
	app.post('/RemoteControle/update-all-alertes', function (req, res) {
		if(haveParam(req.body,["alertes"])){
			clients.emit('update-all-alertes',req.body.alertes);
			
			res.respond("[Success update all alertes]",200);
		}else{
			res.respond('[Alerts param manquant]', 400);
		}
	});
}

exports.router = router;