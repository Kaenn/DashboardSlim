(function($){
	// Parametre par defaut
	var defauts={
		'titre' : null,
		'content' : []
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
			that.contener({
				'content' :
					$("<ul>", {"class" : "list-group checker-plugin"}).append([
						$('<li>',{'id' : "zabbix-div"}).checker({"label" : "Zabbix", "isCheck" : true}),
						$('<li>').checker({"label" : "WPM", "isCheck" : true}),
						$('<li>').checker({"label" : "Oraconsole", "isCheck" : true}),
						$('<li>',{'id' : "nagios-sd-div"}).checker({"label" : "Nagios-SD", "isCheck" : false}),
						$('<li>').checker({"label" : "Typhon", "isCheck" : true}),
						$('<li>').checker({"label" : "AWS", "isCheck" : false})
					]),
				'plugin' : "checker"
			});
			
			return that;
		};
		
		var methods={
			//update : function(operator,operand){ return update(operator,operand)}
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