(function($){
	// Parametre par defaut
	var defauts={
		'outil' : "",
		'projet' : "",
		'nb_occur' : "",
		'priorite' : 2
	};


	$.fn.alerte=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var alerte=$(this).data('alerte');
			if (typeof alerte === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				alerte=$.alerte($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				alerte.doPublicMethod(method,methodArgs);
			}
			$(this).data('alerte',alerte);
		});
		
		return this;
	};



	$.alerte=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("well well-prior"+that.parametres.priorite+" panel-alerte");
			
			that.append([
				$("<div>",{class:"alerte-logo"}).html(
					'<svg version="1.1" class="alerte-logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height:"150px" viewBox="0 0 60 60" >'+
						'<text x="30px" y="30px">'+that.parametres.outil+'</text>'+
					'</svg>'
				),
				$("<div>",{class:"desc-alerte"}).append([
				    $("<span>").text(that.parametres.projet),
				    $("<span>",{class:"badge pull-right"}).text(that.parametres.nb_occur)
				])
			]);
			
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