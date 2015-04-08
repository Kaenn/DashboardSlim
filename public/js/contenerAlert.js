(function($){
	// Parametre par defaut
	var defauts={
		'alerts' : []
	};


	$.fn.contenerAlert=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var contenerAlert=$(this).data('contenerAlert');
			if (typeof contenerAlert === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				contenerAlert=$.contenerAlert($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				contenerAlert.doPublicMethod(method,methodArgs);
			}
			$(this).data('contenerAlert',contenerAlert);
		});
		
		return this;
	};



	$.contenerAlert=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("contener-alert");
			
			
			
			for(var alert_key in that.parametres.alerts){
				var alert=that.parametres.alerts[alert_key];
				that.append(
					$("<div>",{class:"well well-prior1 dashboard-alert"}).append([
						$("<div>",{class:"alert-logo"}).append(
							$("<svg>",{
								version:"1.1",class:"alert-logo",xmlns:"http://www.w3.org/2000/svg",
								xlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"150px",height:"150px",viewBox:"0 0 60 60"
							}).append(
								$("<text>",{x:"30px",y:"30px"}).text(alert["outil"])
							)
						),
						$("<div>",{class:"desc-alert"}).append([
						    $("<span>").text(alert["projet"]),
						    $("<span>",{class:"badge pull-right"}).text(alert["nb_occur"])
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