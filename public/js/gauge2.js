(function($){
	// Parametre par defaut
	var defauts={
		"title": "Titre du Gauge",
		"height" : '250px',
		"id" : "gauge2"
	};


	$.fn.gauge2=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var gauge2=$(this).data('gauge2');
			if (typeof gauge2 === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				gauge2=$.gauge2($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				gauge2.doPublicMethod(method,methodArgs);
			}
			$(this).data('gauge2',gauge2);
		});
		
		return this;
	};



	$.gauge2=function(that,methodOrOptions){
		that.gauge=null;
	
		var initialize = function(){
			
			// On vide le conteneur
			that.empty();
			
			// Creation du squelette du gauge
			that.append(
				$('<div>',{ "class" : "panel panel-default panel-gauge"}).append([
					$('<div>', { "class" : "gauge-graph"}).html(	
						'<svg viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%;">'+
							'<g transform="translate(25,25)">'+
								'<g transform="rotate(135,0,0)">'+
									'<path class="gauge-background" d="M25,0 a25,25 0 1,1 -25,-25 l0,10 a15,15 0 1,0 15,15 z"></path>'+
									'<g transform="rotate(270,0,0)" class="gauge-pourcent">'+
										'<path class="value-color" d=""></path>'+
									'</g>'+
									'<path class="font-color" d="M25,0 a25,25 0 1,1 -25,-25 l0,10 a15,15 0 1,0 15,15 z l25,0 l0,-50 l-100,0 l0,100 l100,0 l0,-50z"></path>'+
								'</g>'+
							'</g>'+
							'<text x="25" y="28" fill="white" class="gauge-text-pourcent">0%</text>'+
						'</svg>'
					)
				])
			);
			
			
			return that;
		};
		
		var update = function(pourcentage){
			var angle=parseInt(pourcentage*(360-90)/100);
			
			var pathFirstTier="M0,0 l25,0 a25,25 0 0,0 -25,-25z";
			var pathSecondTier="M25,0 a25,25 0 0,0 -50,0z";
			var pathLastTier="M0,0 l25,0 a25,25 0 1,0 -25,25z";
			
			if(angle==0){
				that.find(".gauge-pourcent path").attr("d","");
			}else if(angle<90){
				that.find(".gauge-pourcent path").attr("d",pathFirstTier);
			}else{
				if(angle<180){
					that.find(".gauge-pourcent path").attr("d",pathSecondTier);
				}else{
					that.find(".gauge-pourcent path").attr("d",pathLastTier);
				}
			}
			that.find(".gauge-pourcent").attr("transform","rotate("+angle+",0,0)");
			that.find(".gauge-text-pourcent").text(pourcentage+"%");
			
			return that;
		};
		
		var methods={
			update : function(val){ return update(val)}
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