(function($){
	// Parametre par defaut
	var defauts={
		"title": "Chat",
		"height" : '250px',
		"maxMessage" : 10
	};


	$.fn.chat=function(methodOrOptions){
		var methodArgs=arguments;	
		this.each(function(){
			var chat=$(this).data('chat6');
			if (typeof chat === "undefined") {
				// On initialise la classe
				var options=methodOrOptions;
			
				chat=$.chat($(this),options);
			}else{
				// On applique une method public sur la classe
				var method=methodOrOptions;
			
				chat.doPublicMethod(method,methodArgs);
			}
			
			$(this).data('chat6',chat);
		});
		
	};



	$.chat=function(that,methodOrOptions){
		var initialize = function(){
			// Debut variable de test
			that.compteur=0;
			// Fin Variable de test
			
			// On vide le conteneur
			that.html('');
			
			// Création du conteneur de message
			that._messageContent=$('<div></div>').addClass('chat-content-message');   
			
			// Création du squelette du chat
			that.append(
				$('<div></div>').addClass('panel panel-default no-radius').append(
					[
						$('<div></div>').addClass("panel-heading").html(that.parametres.title),
						$('<div></div>').addClass("panel-body").append(
							$('<ul></ul>').addClass('chat').css('height',that.parametres.height).append(that._messageContent)
						)
					]
				)
			);
			return that;
		};
		
		var addMessage = function(auteur,time,message){
			console.log('Glenn beau gosse ;) ====> '+auteur+" ## "+time+" ## "+message);
		
			var message_elem=$('<li></li>').addClass("clearfix").append(
				$('<div></div').addClass('chat-body clearfix').append(
					[
						$('<div></div>').addClass('header').append(
							[
								$('<strong></strong>').addClass('primary-font').html(auteur),
								$('<small></small>').addClass('pull-right text-muted').append(
									[
										$('<span></span>').addClass('glyphicon glyphicon-time'),
										time
									]
								)
							]
						),
						$('<p></p>').html(message)
					]
				)
			);
			that._messageContent.append(message_elem);
			while(that._messageContent.children().length > that.parametres.maxMessage){
				that._messageContent.children().first().remove();
			}
			return that;
		};
		
		var methods={
			addMessage : function(auteur,time,message){ return addMessage(auteur,time,message)}
		};
		
		that.doPublicMethod=function(method,args){
			console.log('metho chat DEBUT args');
			for(key in args) console.log('metho chat args => '+args[key]);
			console.log('metho chat FIN args');
			if ( methods[method] ) {
				return methods[ method ].apply( that, Array.prototype.slice.call( args, 1 ));
			} else{
				$.error( 'Method ' +  method + ' does not exist on jQuery.chat' );
			}
		}
		
		
		// Prise en compte des options utilisateurs
		that.parametres=$.extend(defauts, methodOrOptions);
		return initialize();
		
    };
	
	
	
})(jQuery);