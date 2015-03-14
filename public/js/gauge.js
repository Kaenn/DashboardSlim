(function($){
	// Parametre par defaut
	var defauts={
		"title": "Titre du Gauge",
		"height" : '250px',
		"id" : "gauge"
	};


	$.fn.gauge=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var gauge=$(this).data('gauge');
			if (typeof gauge === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				gauge=$.gauge($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				gauge.doPublicMethod(method,methodArgs);
			}
			$(this).data('gauge',gauge);
		});
		
		return this;
	};



	$.gauge=function(that,methodOrOptions){
		that.gauge=null;
	
		var initialize = function(){
			
			// On vide le conteneur
			that.html('');
			
			// Cr�ation du squelette du gauage
			that.append(
				$('<div>',{ "class" : "panel panel-default panel-gauge"}).append([
					$('<div>', { "class" : "panel-heading"}).html(that.parametres.titre),
					$('<div>', { "class" : "panel-body"}).append(
						$('<div>', { 'id' : that.parametres.id })
					),
				])
			);
			
			that.gauge = c3.generate({
				bindto: '#'+that.parametres.id,
				data: {
					columns: [
						['data', that.parametres.value]
					],
					type: 'gauge'
				},
				gauge: {
			//        label: {
			//            format: function(value, ratio) {
			//                return value;
			//            },
			//            show: false // to turn off the min/max labels.
			//        },
			//    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
			//    max: 100, // 100 is default
			//    units: ' %',
			//    width: 39 // for adjusting arc thickness
				},
				color: {
					pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
					threshold: {
			//            unit: 'value', // percentage is default
			//            max: 200, // 100 is default
						values: [30, 60, 90, 100]
					}
				},
				size: {
					height: that.parametres.height
				},
				tooltip : {
					show : false
				}
			});
			return that;
		};
		
		var update = function(val){
			that.gauge.load({
				columns: [['data', val]]
			});
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