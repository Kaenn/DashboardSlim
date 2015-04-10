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
			
			
			
			for(var id_alerte in that.parametres.alertes){
				var alerte=that.parametres.alertes[id_alerte];
				that.append(
					$("<div>").alerte({
						"id" : id_alerte,
						"outil" : alerte["outil"],
						"projet" : alerte["projet"],
						"nb_occur" : alerte["nb_occur"],
						"priorite" : alerte["priorite"]
					})
				);
			}
			
			that.find(".panel-alerte").show(500);
			
			return that;
		};
		
		var getAlerte=function(id){
			return that.find(".panel-alerte[alerte-id='"+id+"']");
		}
		
		var alerteExiste=function(id){
			return getAlerte(id).length > 0;
		}
		
		var remove=function(id,outil,projet,nb_occur,priorite){
			getAlerte(id).alerte("remove");
			
			return that;
		}
		
		var create=function(id,outil,projet,nb_occur,priorite){
			if(!alerteExiste(id)){
				var alerte=$("<div>").alerte({
					"id" : id,
					"outil" : outil,
					"projet" : projet,
					"nb_occur" : nb_occur,
					"priorite" : priorite
				});
				
				that.append(alerte);
				
				alerte.show(500);
			}else{
				console.log("L'alerte "+id+" existe déjà est ne peut donc pas être recréer!");
			}
			
			return that;
		}
		
		var update=function(id,outil,projet,nb_occur,priorite){
			console.log("update "+id);
			getAlerte(id).alerte("update",outil,projet,nb_occur,priorite);
			
			return that;
		}
		
		var updateAll=function(alertes){
			var alertesId=[];
			for(var alerte_id in alertes){
				var alerte=alertes[alerte_id];
				
				if(!alerteExiste(alerte_id)){
					create(alerte_id,alerte.outil,alerte.projet,alerte.nb_occur,alerte.priorite);
				}else{
					update(alerte_id,alerte.outil,alerte.projet,alerte.nb_occur,alerte.priorite);
				}
				alertesId.push(alerte_id);
			}
			
			that.find(".panel-alerte").each(function(){
				var aId=""+$(this).attr("alerte-id");
				console.log(alertesId);
				console.log(aId);
				console.log(aId in alertesId);
				console.log("---------------");
				if(!(aId in alertesId)){
					remove(aId);
				}
			});
		}
		
		// Liste des methodes externe
		var methods={
			remove : function(id,outil,projet,nb_occur,priorite){ return remove(id,outil,projet,nb_occur,priorite)},
			create : function(id,outil,projet,nb_occur,priorite){ return create(id,outil,projet,nb_occur,priorite)},
			update : function(id,outil,projet,nb_occur,priorite){ return update(id,outil,projet,nb_occur,priorite)},
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