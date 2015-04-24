(function($){
	// Parametre par defaut
	var defauts={
		"label" : ["Zabbix","WPM","Oraconsole","Nagios-SD","Typhon","AWS"],
		"value" : [34,23,32,3,8,2],
		"color" : ["#5bc0de","rgb(128,133,189)","#04519B","rgb(153,77,77)","#FF9999","#7B4F9D"]
	};


	$.fn.progressBar=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var progressBar=$(this).data('progressBar');
			if (typeof progressBar === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				progressBar=$.progressBar($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				progressBar.doPublicMethod(method,methodArgs);
			}
			$(this).data('progressBar',progressBar);
		});
		
		return this;
	};



	$.progressBar=function(that,methodOrOptions){
		
		var initialize = function(){
			
			// On vide le conteneur
			that.empty();
			
			var values ={
				"Zabbix" : 5,
				"WPM" : 46,
				"Oraconsole" : 69,
				"Nagios-SD" : 6,
				"Typhon" : 10,
				"AWS" : 8
			}
			
			var color={
				"Zabbix" : "#5bc0de",
				"WPM" : "rgb(128,133,189)",
				"Oraconsole" : "#04519B",
				"Nagios-SD" : "rgb(153,77,77)",
				"Typhon" : "#FF9999",
				"AWS" : "#7B4F9D"
			}
			
			// Création du squelette
			that.append(
				$('<div>',{ "class" : "content"}).append([
					$('<div>', { "class" : "row"}).append(
						$('<div>',{"class" : "progress-legend"})
					),
					$('<div>', { "class" : "row"}).append(
						$('<div>', { 'class' : "progress" })
					),
				])
			);
			
			update(values,color);
			
			return that;
		};
		
		// Permet un repartition proportionnelle des votes en fonction du nombre de place
		var repartitionProportionnelle=function(place, votes){
			// Clone des votes
			var resteVotes=jQuery.extend({}, votes);
			var sumVotes=0;
			var res={};
			for(var label in resteVotes){
				resteVotes[label]=(parseInt(resteVotes[label]) || 0);
				sumVotes+=resteVotes[label];
				res[label]=0;
			}
			
			var onePlace=sumVotes/place;
			
			var continuer=true;
			var nbVotes=0;
			while(continuer && nbVotes < place){
				var labelMax="";
				var voteMax=0;
				
				for(var label in resteVotes){
					if(voteMax < resteVotes[label]){
						voteMax=resteVotes[label];
						labelMax=label;
					}
				}
				
				if(labelMax!=""){
					res[labelMax]+=1;
					resteVotes[labelMax]-=onePlace;
					if(resteVotes[labelMax]<=0) delete resteVotes[labelMax];
					
					nbVotes++;
				}else{
					continuer=false;
				}
			}
			
			return res;
		}
		
		var update = function(values,color){
			var repartition=repartitionProportionnelle(100,values);
			
			var progressBarBadge=[];
			var progressBar=[];
			
			for(var label in repartition){
				progressBarBadge.push($('<div>',{"class":"legend-"+label}).append([
       				$('<span>',{"class":"label-legend"}).css("color",color[label]).html(label),
       				$('<span>',{"class":"badge badge-legend"}).css("background-color",color[label]).html(values[label])
       			]));
				
				progressBar.push($('<div>',{"class":"progress-bar progress-bar-"+label}).css({'width':repartition[label]+"%","background-color":color[label]}));
			}
			

			that.find(".progress-legend").empty().append(progressBarBadge);
			that.find(".progress").empty().append(progressBar);
			
			
			return that;
		};
		
		var methods={
			update : function(val,color){ return update(val,color)}
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