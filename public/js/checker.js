(function($){
	// Parametre par defaut
	var defauts={
		"isCheck" : true
	};


	$.fn.checker=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var checker=$(this).data('checker');
			if (typeof checker === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				checker=$.checker($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				checker.doPublicMethod(method,methodArgs);
			}
			$(this).data('checker',checker);
		});
		
	};



	$.checker=function(that,methodOrOptions){
		that.gauge=null;
	
		var initialize = function(){
			
			// On vide le conteneur
			that.html('');
			
			var checkClass="glyphicon-ok";
			if(!that.parametres.isCheck) checkClass="glyphicon-remove";
			
			// Création du squelette du gauage
			that.append(
				$('<div>').append([
					$('<span>', { "class" : "badge badge-ok","aria-hidden" : "true"}).append(
						$('<span>',{"class" : "glyphicon "+checkClass})
					),
					$('<span>', { "class" : "checker-label"}).html(that.parametres.label),
				])
			);
			
			return that;
		};
		
		var update = function(isCheck){
			var checkClass="glyphicon-ok";
			if(!isCheck) checkClass="glyphicon-remove";
			
			that.append(
				$('<div>').append([
					$('<span>', { "class" : "badge badge-ok","aria-hidden" : "true"}).append(checkSpan),
					$('<span>', { "class" : "checker-label"}).html(that.parametres.label),
				])
			);
			
			return that;
		};
		
		var methods={
			update : function(isCheck){ return update(isCheck)}
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