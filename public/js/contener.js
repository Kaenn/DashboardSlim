(function($){
	// Parametre par defaut
	var defauts={
		'titre' : [],
		'content' : []
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
			
			// Création du squelette du gauge
			that.append(
				$('<div>',{ "class" : "panel panel-default panel-gauge"}).append([
					$('<div>', { "class" : "panel-heading"}).html(that.parametres.titre),
					$('<div>', { "class" : "panel-body"}).append(that.parametres.content)
				])
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