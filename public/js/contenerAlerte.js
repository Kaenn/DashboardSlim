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
					$("<div>",{class:"well well-prior1 dashboard-alerte"}).append([
						$("<div>",{class:"alerte-logo"}).html(
							'<svg version="1.1" class="alerte-logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height:"150px" viewBox="0 0 60 60" >'+
								'<text x="30px" y="30px">'+alerte["outil"]+'</text>'+
							'</svg>'
						),
						$("<div>",{class:"desc-alerte"}).append([
						    $("<span>").text(alerte["projet"]),
						    $("<span>",{class:"badge pull-right"}).text(alerte["nb_occur"])
						])
					])	
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