(function($){
	// Parametre par defaut
	var defauts={
		"title": "Chat",
		"height" : '250px',
		"maxMessage" : 10
	};


	$.fn.chat=function(methodOrOptions){
		console.log('glenn2');
		var methodArgs=arguments;	
		this.each(function(){
			console.log('here');
			console.log($(this));
			var chat=$(this).data('chat6');
			console.log(chat);
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



	$.chat=function(contener,methodOrOptions){
		this.contener=contener;
	
		this.initialize = function(){
			// Debut variable de test
			this.compteur=0;
			// Fin Variable de test
			
			// On vide le conteneur
			this.contener.html('');
			
			// Création du conteneur de message
			this._messageContent=$('<div></div>').addClass('chat-content-message');   
			
			// Création du squelette du chat
			this.contener.append(
				$('<div></div>').addClass('panel panel-default no-radius').append(
					[
						$('<div></div>').addClass("panel-heading").html(this.parametres.title),
						$('<div></div>').addClass("panel-body").append(
							$('<ul></ul>').addClass('chat').css('height',this.parametres.height).append(this._messageContent)
						)
					]
				)
			);
			return this;
		};
		
		this.addMessage = function(auteur,time,message){
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
			this._messageContent.append(message_elem);
			while(this._messageContent.children().length > this.parametres.maxMessage){
				this._messageContent.children().first().remove();
			}
			return this;
		};
		
		var methods={
			addMessage : function(auteur,time,message){ return this.addMessage(auteur,time,message)}
		};
		
		this.doPublicMethod=function(method,args){
			console.log('metho chat');
			if ( methods[method] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( args, 1 ));
			} else{
				$.error( 'Method ' +  method + ' does not exist on jQuery.chat' );
			}
		}
		
		
		// Prise en compte des options utilisateurs
		this.parametres=$.extend(defauts, methodOrOptions);
		return this.initialize();
		
    };
	
	
	
})(jQuery);