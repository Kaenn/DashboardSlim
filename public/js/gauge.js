(function($){
	// Parametre par defaut
	var defauts={
		"title": "Gauge",
		"height" : '250px'
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
		
	};



	$.gauge=function(contener,methodOrOptions){
		this.contener=contener;
		
		this.gauge=null;
	
		this.initialize = function(){
			
			// On vide le conteneur
			this.contener.html('');
			
			// Création du squelette du gauage
			this.contener.append(
				$('<div>',{ "class" : "panel panel-default panel-gauge"}).append([
					$('<div>', { "class" : "panel-heading"}).html("Titre du gauge"),
					$('<div>', { "class" : "panel-body"}).append(
						$('<div>', { 'id' : 'gauge1' })
					),
				])
			);
			
			this.gauge = c3.generate({
				bindto: '#gauge1',
				data: {
					columns: [
						['data', 61]
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
					height: 180
				},
				tooltip : {
					show : false
				}
			});
			return this;
		};
		
		this.update = function(val){
			this.gauge.load({
				columns: [['data', val]]
			});
			return this;
		};
		
		var methods={
			update : function(val){ return this.update(val)}
		};
		
		this.doPublicMethod=function(method,args){
			if ( methods[method] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( args, 1 ));
			} else{
				$.error( 'Method ' +  method + ' does not exist on jQuery.gauge' );
			}
		}
		
		
		// Prise en compte des options utilisateurs
		this.parametres=$.extend(defauts, methodOrOptions);
		return this.initialize();
		
    };
	
	
	
})(jQuery);