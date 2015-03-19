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
			that.html('');
				
			
			var test ={
				"zabbix" : 66,
				"wpm" : 46,
				"oraconsole" : 69,
				"nagios-sd" : 6,
				"typhon" : 10,
				"aws" : 8
			}
			
			console.log(repartitionProportionnelle(100,test));
			
			var progressBarBadge=[];
			progressBarBadge.push($('<div>',{"class":"legend-zabbix"}).append([
				$('<span>',{"class":"label-legend"}).html("Zabbix"),
				$('<span>',{"class":"badge badge-legend"}).html("32")
			]));
			progressBarBadge.push($('<div>',{"class":"legend-wpm"}).append([
				$('<span>',{"class":"label-legend"}).html("WPM"),
				$('<span>',{"class":"badge badge-legend"}).html("23")
			]));
			progressBarBadge.push($('<div>',{"class":"legend-oraconsole"}).append([
				$('<span>',{"class":"label-legend"}).html("Oraconsole"),
				$('<span>',{"class":"badge badge-legend"}).html("32")
			]));
			progressBarBadge.push($('<div>',{"class":"legend-nagio-sd"}).append([
				$('<span>',{"class":"label-legend"}).html("Nagios-SD"),
				$('<span>',{"class":"badge badge-legend"}).html("3")
			]));
			progressBarBadge.push($('<div>',{"class":"legend-typhon"}).append([
				$('<span>',{"class":"label-legend"}).html("Typhon"),
				$('<span>',{"class":"badge badge-legend"}).html("5")
			]));
			progressBarBadge.push($('<div>',{"class":"legend-aws"}).append([
				$('<span>',{"class":"label-legend"}).html("AWS"),
				$('<span>',{"class":"badge badge-legend"}).html("4")
			]));
			
			var progressBar=[];
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-zabbix"}).css('width',"32%"));
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-wpm"}).css('width',"23%"));
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-oraconsole"}).css('width',"32%"));
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-nagios-sd"}).css('width',"3%"));
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-typhon"}).css('width',"5%"));
			progressBar.push($('<div>',{"class":"progress-bar progress-bar-aws"}).css('width',"4%"));
			
			// Création du squelette
			that.append(
				$('<div>',{ "class" : "content"}).append([
					$('<div>', { "class" : "row"}).append(
						$('<div>',{"class" : "progress-legend"}).append(progressBarBadge)
					),
					$('<div>', { "class" : "row"}).append(
						$('<div>', { 'class' : "progress" }).append(progressBar)
					),
				])
			);
			
			
			return that;
		};
		
		var repartitionProportionnelle=function(place, votes){
			var sumVotes=0;
			var res={};
			for(var label in votes){
				sumVotes+=votes[label];
				res[label]=0;
			}
			
			var onePlace=sumVotes/place;
			
			var continuer=true;
			var nbVotes=0;
			while(continuer && nbVotes < place){
				var labelMax="";
				var voteMax=0;
				
				for(var label in votes){
					if(voteMax < votes[label]){
						voteMax=votes[label];
						labelMax=label;
					}
				}
				
				if(labelMax!=""){
					res[labelMax]+=1;
					votes[labelMax]-=onePlace;
					if(votes[labelMax]<=0) delete votes[labelMax];
					
					nbVotes++;
				}else{
					continuer=false;
				}
			}
			
			return res;
		}
		
		var update = function(val){
			
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