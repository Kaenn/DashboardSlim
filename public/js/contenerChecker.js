(function($){
	// Parametre par defaut
	var defauts={
		'titre' : null,
		'checkList' : {}
	};


	$.fn.contenerChecker=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var contenerChecker=$(this).data('contenerChecker');
			if (typeof contenerChecker === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				contenerChecker=$.contenerChecker($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				contenerChecker.doPublicMethod(method,methodArgs);
			}
			$(this).data('contenerChecker',contenerChecker);
		});
		
		return this;
	};



	$.contenerChecker=function(that,methodOrOptions){
		var initialize = function(){
			var checkerList=[];
			
			for(var label in that.parametres.checkList){
				checkerList.push($('<li>',{'class' : "checker-"+label}).checker({"label" : label, "isCheck" : that.parametres.checkList[label]}));
			}
			
			that.contener({
				'content' :
					$("<ul>", {"class" : "list-group checker-plugin"}).append(checkerList),
				'plugin' : "checker"
			});
			
			return that;
		};
		
		var update=function(label,isCheck){
			that.find(".checker-plugin .checker-"+label).checker("update",isCheck);
		};
		
		var methods={
			update : function(label,isCheck){ return update(label,isCheck)}
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