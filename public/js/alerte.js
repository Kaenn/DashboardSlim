(function($){
	// Parametre par defaut
	var defauts={
		'id' : null,
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
		// Contient l'animation de modification de l'alerte
		var modifAnimate=null;
		
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			that.addClass("well panel-alerte")
				.attr("priorite",that.parametres.priorite);
			
			that.append([
				$("<div>",{class:"alerte-logo"}).html(
					'<svg version="1.1" class="alerte-logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height:"150px" viewBox="0 0 60 60" >'+
						'<text x="30px" y="30px" class="alerte-outil">'+that.parametres.outil+'</text>'+
					'</svg>'
				),
				$("<div>",{class:"desc-alerte"}).append([
				    $("<span>",{class:"alerte-projet"}).text(that.parametres.projet),
				    $("<span>",{class:"badge pull-right alerte-nb-occur"}).text(that.parametres.nb_occur)
				])
			])
				// On ne rend pas visible pour pouvoir mettre un effet sur le show
				.hide()
				.attr("alerte-id",that.parametres.id);
			
			// On supprime l'ancienne animation
			clearTimeout(modifAnimate);
			
			// On lance la nouvelle animation
			that.addClass("haveModif");
			modifAnimate=setTimeout(function(){ 
				that.removeClass("haveModif");
			}, 3000);
			
			return that;
		};
		
		var remove=function(){
			that.hide(500);
		}
		
		
		var update=function(outil,projet,nb_occur,priorite){
			var old_outil=that.find(".alerte-outil").text();
			var old_projet=that.find(".alerte-projet").text();
			var old_nb_occur=that.find(".alerte-nb-occur").text();
			var old_priorite=that.attr("priorite");
			
			// On verifie si il y a eu des modifs
			if(old_outil!=outil || old_projet!=projet || old_nb_occur!=nb_occur || old_priorite!=priorite){
				// On supprime l'ancienne animation
				clearTimeout(modifAnimate);
				that.find(".alerte-outil").text(outil);
				that.find(".alerte-projet").text(projet);
				that.find(".alerte-nb-occur").text(nb_occur);
				
				that.attr("priorite",priorite);
				
				// On lance la nouvelle animation
				that.addClass("haveModif");
				modifAnimate=setTimeout(function(){ 
					that.removeClass("haveModif");
				}, 3000);
				
			}
		}
		
		// Liste des methodes externe
		var methods={
			remove : function(){ return remove()},
			update : function(outil,projet,nb_occur,priorite){ return update(outil,projet,nb_occur,priorite)}
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