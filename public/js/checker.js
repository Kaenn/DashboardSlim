(function($){
	// Parametre par defaut
	var defauts={
		"isCheck" : true,
		"label" : "label"
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
		
		return this;
	};



	$.checker=function(that,methodOrOptions){
		that.gauge=null;
	
		var initialize = function(){
			
			// On vide le conteneur
			that.html('');
			
			var checkClass="glyphicon-ok";
			
			if(!that.parametres.isCheck){
				checkClass="glyphicon-remove";
				that.removeClass("checker-ok").addClass("checker-nok");
			}else{
				that.removeClass("checker-nok").addClass("checker-ok");
			}
			
			
			// Création du squelette du gauage
			that.append(
				$("<span>", {"class" : "glyphicon "+checkClass}),
				$("<span>", {"class" : "checker-label"}).text(that.parametres.label)
			).addClass("list-group-item");
			
			return that;
		};
		
		var update = function(isCheck){
			if(isCheck){
				that.removeClass("checker-nok");
				that.addClass("checker-ok");
				that.find('.glyphicon').removeClass("glyphicon-remove");
				that.find('.glyphicon').addClass("glyphicon-ok");
			}else{
				that.removeClass("checker-ok");
				that.addClass("checker-nok");
				that.find('.glyphicon').removeClass("glyphicon-ok");
				that.find('.glyphicon').addClass("glyphicon-remove");
			}
			
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