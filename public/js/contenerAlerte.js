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
						"outil" : alerte["outil"],
						"projet" : alerte["projet"],
						"nb_occur" : alerte["nb_occur"],
						"priorite" : alerte["priorite"]
					})
				);
			}
			
			return that;
		};
		
		// Liste des methodes externe
		var methods={};
		
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