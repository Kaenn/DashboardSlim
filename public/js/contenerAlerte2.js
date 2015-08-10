(function($){
	// Parametre par defaut
	var defauts={
		'alertes' : []
	};


	$.fn.contenerAlerte=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var contenerAlerte=$(this).data('contenerAlerte');
			if (typeof contenerAlerte === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				contenerAlerte=$.contenerAlerte($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				contenerAlerte.doPublicMethod(method,methodArgs);
			}
			$(this).data('contenerAlerte',contenerAlerte);
		});
		
		return this;
	};



	$.contenerAlerte=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("contener-alerte");
			
			
			for(var alerte_key in that.parametres.alertes){
				var alerte=that.parametres.alertes[alerte_key];
				
				that.append(
					$("<div>").alerte({
						"id" : alerte['id'],
						"tache" : alerte["tache"],
						"projet" : alerte["projet"],
						"client" : alerte["client"],
						"serveur" : alerte["serveur"],
						"description" : alerte["description"],
						"priorite" : alerte["priorite"]
					})
				);
			}
			
			that.find(".dash-alerte").show(500);
			
			return that;
		};
		
		var getAlerte=function(id){
			return that.find(".dash-alerte[alerte-id='"+id+"']");
		}
		
		var alerteExiste=function(id){
			return getAlerte(id).length > 0;
		}
		
		var remove=function(id){
			getAlerte(id).alerte("remove");
			
			return that;
		}
		
		var create=function(id,tache,projet,client,serveur,description,priorite){
			if(!alerteExiste(id)){
				var alerte=$("<div>").alerte({
					"id" : id,
					"tache" : tache,
					"projet" : projet,
					"client" : client,
					"serveur" : serveur,
					"description" : description,
					"priorite" : priorite
				});
				
				that.append(alerte);
				
				alerte.show(500);
			}else{
				console.log("L'alerte "+id+" existe déjà est ne peut donc pas être recréer!");
			}
			
			return that;
		}
		
		var update=function(id,tache,projet,client,serveur,description,priorite){
			getAlerte(id).alerte("update",tache,projet,client,serveur,description,priorite);
			
			return that;
		}
		
		var updateAll=function(alertes){
			var alertesId=[];
			for(var alerte_key in alertes){
				var alerte=alertes[alerte_key];
				
				if(!alerteExiste(alerte.id)){
					create(alerte.id,alerte.tache,alerte.projet,alerte.client,alerte.serveur,alerte.description,alerte.priorite);
				}else{
					update(alerte.id,alerte.tache,alerte.projet,alerte.client,alerte.serveur,alerte.description,alerte.priorite);
				}
				alertesId.push(""+alerte.id);
			}
			
			that.find(".dash-alerte").each(function(){
				var aId=""+$(this).attr("alerte-id");
				
				if(alertesId.indexOf(aId)=="-1"){
					remove(aId);
				}
			});
		}
		
		// Liste des methodes externe
		var methods={
			remove : function(id){ return remove(id)},
			create : function(id,tache,projet,client,serveur,description,priorite){ return create(id,tache,projet,client,serveur,description,priorite)},
			update : function(id,tache,projet,client,serveur,description){ return update(id,tache,projet,client,serveur,description)},
			updateAll : function(alertes){ return updateAll(alertes)}
		};
		
		that.doPublicMethod=function(method,args){
			if ( methods[method] ) {
				return methods[ method ].apply( that, Array.prototype.slice.call( args, 1 ));
			} else{
				$.error( 'Method ' +  method + ' does not exist on jQuery.gauge' );
			}
		}
		
		
		// Prise en compte des options utilisateurs
		that.parametres=$.extend(defauts, methodOrOptions);
		return initialize();
		
    };
	
	
	
})(jQuery);