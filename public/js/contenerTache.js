(function($){
	// Parametre par defaut
	var defauts={
		'taches' : []
	};


	$.fn.contenerTache=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var contenerTache=$(this).data('contenerTache');
			if (typeof contenerTache === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				contenerTache=$.contenerTache($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				contenerTache.doPublicMethod(method,methodArgs);
			}
			$(this).data('contenerTache',contenerTache);
		});
		
		return this;
	};



	$.contenerTache=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("contener-taches");
			
			that._taches=$("<div>",{'class':'panel-group','id':'contenerTache','role':'tablist','aria-multiselectable':true});
			
			$.each(that.parametres.taches, function(index,tache){
				add(tache.source,tache.idClient,tache.idProjet,tache.cible,tache.titre,tache.date,tache.description,tache.consigne);
			});
			
			// Réalise l'affichage des taches
			that.find(".dash-tache").show(500);
			
			return that;
		};
		
		// Recuperation de l'identifiant de la tache
		var getID=function(source,cible,titre){
			return source+"-"+cible+"-"+titre;
		}
		
		// Ajout de la tache
		// Creation si elle n'existe pas sinon mise a jours
		var add=function(source,idClient,idProjet,cible,titre,date,description,consigne){
			var id=getIDTache(source,cible,titre);
			
			if(tacheExiste(id)){
				update(id,source,idClient,idProjet,cible,titre,date,description,consigne);
			}else{
				create(id,source,idClient,idProjet,cible,titre,date,description,consigne);
			}
			
			return that;
		}
		
		// Creation de la tache
		var create=function(id,source,idClient,idProjet,cible,titre,date,description,consigne){
			that._taches.append(
				$("<div>").tache(id,source,idClient,idProjet,cible,titre,date,description,consigne)
			);
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