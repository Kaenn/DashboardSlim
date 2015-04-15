(function($){
	// Parametre par defaut
	var defauts={
		'titre' : null,
		'content' : [],
		'plugin' : ""
	};


	$.fn.contener=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var contener=$(this).data('contener');
			if (typeof contener === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				contener=$.contener($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				contener.doPublicMethod(method,methodArgs);
			}
			$(this).data('contener',contener);
		});
		
		return this;
	};



	$.contener=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.html('');
			
			var contenerSquelette=[];
			
			var classPlugin="";
			if(that.parametres.plugin != "") classPlugin=" panel-"+that.parametres.plugin;
			// On affiche le titre si il en a un
			if(that.parametres.titre != null) contenerSquelette.push($('<div>', { "class" : "panel-heading"}).html(that.parametres.titre));
			contenerSquelette.push($('<div>', { "class" : "panel-body"+classPlugin}).append(that.parametres.content));
			
			// Création du squelette du gauge
			that.append(
				$('<div>',{ "class" : "panel-default panel-contener"}).append(contenerSquelette)
			);
			
			
			return that;
		};
		
		var methods={
			//update : function(operator,operand){ return update(operator,operand)}
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