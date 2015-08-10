(function($){
	// Parametre par defaut
	var defauts={
		"id" : null,
		"tache" : "",
		"projet" : "",
		"client" : "",
		"serveur" : "",
		"description" : "",
		"priorite" : 1
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
		var modifAnimate=null;
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("row dash-alerte")
				.attr("priorite",that.parametres.priorite);
			
			that.append([
           		$("<div>",{"class":"col-lg-2"}).append([
           			$("<div>",{"class":"row alerte-row-tache"}).append([
           				$("<span>",{"class":"alerte-tache"}).text(that.parametres.tache)
           			])
           		]),
           		$("<div>",{"class":"col-lg-10"}).append([
           			$("<div>",{"class":"row"}).append([
           				$("<div>",{"class":"col-md-5 col-sm-6 col-xs-12"}).append([
           					$("<span>",{"class":"alerte-cltPrj"}).text(that.parametres.client+"/"+that.parametres.projet)
           				]),
           				$("<div>",{"class":"col-md-5 col-sm-6 col-xs-12"}).append([
           					$("<span>",{"class":"alerte-serveur"}).text(that.parametres.serveur)
           				]),
           				$("<div>",{"class":"col-md-2 col-sm-12 col-xs-12"}).append([
           					$("<span>",{"class":"glyphicon glyphicon-check","aria-hidden":"true"}),
           					$("<span>",{"class":"alerte-checked-name"}).text("glenn.inizan")
           				])
           			]),
           			$("<div>",{"class":"row alerte-short-description"}).append([
           				$("<span>").text(that.parametres.description)
           			])
           		])
			]).hide()
				.attr("alerte-id",that.parametres.id);
			
			return that;
		};
		
		var remove=function(){
			that.hide(500);
		}
		
		
		var update=function(tache,projet,client,serveur,description){
			that.find(".alerte-tache").text(tache);
			that.find(".alerte-cltPrj").text(client+"/"+projet);
			that.find(".alerte-serveur").text(serveur);
			that.find(".alerte-short-description > span").text(description);
		}
		
		// Liste des methodes externe
		var methods={
			remove : function(){ return remove()},
			update : function(tache,projet,client,serveur,description,priorite){ return update(tache,projet,client,serveur,description,priorite)}
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