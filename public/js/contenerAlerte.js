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
			for(var alerte_key in alertes){
				var alerte=alertes[alerte_key];
				
				if(!alerteExiste(alerte.id)){
					create(alerte.id,alerte.outil,alerte.projet,alerte.nb_occur,alerte.priorite);
				}else{
					update(alerte.id,alerte.outil,alerte.projet,alerte.nb_occur,alerte.priorite);
				}
				alertesId.push(alerte.id);
			}
			
			that.find(".panel-alerte").each(function(){
				var aId=$(this).attr("alerte-id");
				
				if(alertesId.indexOf(aId)=="-1"){
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