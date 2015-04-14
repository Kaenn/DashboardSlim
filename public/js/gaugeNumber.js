(function($){
	// Parametre par defaut
	var defauts={
		title : "title",
		operandInit : 0,
		operatorInit : 0
	};


	$.fn.gaugeNumber=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var gaugeNumber=$(this).data('gaugeNumber');
			if (typeof gaugeNumber === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				gaugeNumber=$.gaugeNumber($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				gaugeNumber.doPublicMethod(method,methodArgs);
			}
			$(this).data('gaugeNumber',gaugeNumber);
		});
		
		return this;
	};



	$.gaugeNumber=function(that,methodOrOptions){
		var initialize = function(){
			// On vide le conteneur
			that.empty();
			
			var pourcentage=calculPourcentage(that.parametres.operatorInit,that.parametres.operandInit);
			
			// Création du squelette du gauge
			that.append(
				$("<div>").append([
					$('<div>', {'class' : "inline gauge-group"}).append([
						$('<div>',{'class' : "number-gauge operator"}).append(
							$('<div>', {'class' : "curr-value"}).html(that.parametres.operatorInit)
						),
						$('<span>',{'class' : "separate"}).html(" / "),
						$('<div>',{'class' : "number-gauge operand"}).append(
							$('<div>', {'class' : "curr-value"}).html(that.parametres.operandInit)
						)
					]),
					$('<div>', {'class' : "inline gauge-group"}).append(
						$('<span>',{"class": "pourcentage"}).html(pourcentage+"%")
					),
					$("<div>",{ "class" : "content-title"}).append(
						$("<div>").append([
						    $("<div>",{ "class" : "title"}).html(that.parametres.title)
						]).append()
					)
				])
			).addClass("panel-gaugeNumber");
			// ToDo : Amélioré le background opacity ( opacifi aussi le texte . Pas top...)
			
			return that;
		};
		
		var calculPourcentage=function(operator,operand){
			if(operand == 0) return 0;
			return parseInt(operator*100/operand);
		}
			
		var update = function(operator,operand){
			that.find('.operator').append($('<div>',{'class':"new-value"}).html(operator));
			that.find('.operand').append($('<div>',{'class':"new-value"}).html(operand));
			
			var pourcentage=calculPourcentage(operator,operand);
			that.find('.operator .curr-value').animate(
				{
					'height' : '0px'
				}, 1000, function(){
					$(this).parent().find('.new-value').addClass('curr-value');
					$(this).remove();
				}
			);
			
			
			that.find('.operand .curr-value').animate(
				{
					'height' : '0px'
				}, 1000, function(){
					$(this).parent().find('.new-value').addClass('curr-value');
					$(this).remove();
				}
			);
			
			that.find('.pourcentage').html(pourcentage+"%");
			return that;
		};
		
		var methods={
			update : function(operator,operand){ return update(operator,operand)}
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