<!DOCTYPE html>
<html>
	<head>
		<title>External Remote Controle</title>
            
        <!-- Bootstrap core CSS -->
        <link href="./css/bootstrap-3.3.2/css/bootstrap.min.css" rel="stylesheet">
        <!-- Bootstrap theme -->
        <link href="./css/bootstrap-3.3.2/css/bootstrap-theme-slate.min.css" rel="stylesheet">
		
		
		<meta name="Author" content="SI, Claranet FR">
		<script type="text/javascript" src="./js/jquery-2.1.3.min.js"></script>
		<script src="./css/bootstrap-3.3.2/js/bootstrap.min.js"></script>
		
        <script>
			var textLatin=[
				"Et prima post Osdroenam quam, ut dictum est, ab hac descriptione discrevimus, Commagena, nunc Euphratensis, clementer adsurgit, Hierapoli, vetere Nino et Samosata civitatibus amplis inlustris.",
				"Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.",
				"Proinde concepta rabie saeviore, quam desperatio incendebat et fames, amplificatis viribus ardore incohibili in excidium urbium matris Seleuciae efferebantur, quam comes tuebatur Castricius tresque legiones bellicis sudoribus induratae.",
				"Ideo urbs venerabilis post superbas efferatarum gentium cervices oppressas latasque leges fundamenta libertatis et retinacula sempiterna velut frugi parens et prudens et dives Caesaribus tamquam liberis suis regenda patrimonii iura permisit.",
				"Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur.",
				"Quanta autem vis amicitiae sit, ex hoc intellegi maxime potest, quod ex infinita societate generis humani, quam conciliavit ipsa natura, ita contracta res est et adducta in angustum ut omnis caritas aut inter duos aut inter paucos iungeretur.",
				"Latius iam disseminata licentia onerosus bonis omnibus Caesar nullum post haec adhibens modum orientis latera cuncta vexabat nec honoratis parcens nec urbium primatibus nec plebeiis."
			];
        
			$(function(){
				$('#add_message').on('click',function(){
					var message=$('#message').val();
					var auteur=$('#auteur').val();
					
					$.getJSON( "./ajax/dashboardControl.ajax.php", 
						{ action : "addMessage", message : message, auteur : auteur }, 
						function( data ) {
							console.log(data);
						}
					);
				});

				$('#randomLatin').on('click',function(){
					$('#message').val(getRandomLatin());
				});


				$('#moins-gauge').on('click',function(){
					var valGauge=parseInt($('#gauge-val').val());

					if(isNaN(valGauge)) valGauge=50;

					$('#gauge-val').val(valGauge-5);

					sendValGauge();
				});

				$('#plus-gauge').on('click',function(){
					var valGauge=parseInt($('#gauge-val').val());

					if(isNaN(valGauge)) valGauge=50;

					$('#gauge-val').val(valGauge+5);

					sendValGauge();
				});


				$('#gauge-val').keypress(function(e) {
				    if(e.which == 13) {
				    	sendValGauge();
				    }
				});

				function sendValGauge(){
					var valGauge=parseInt($('#gauge-val').val());
					
					$.getJSON( "./ajax/dashboardControl.ajax.php", 
						{ action : "updateGauge", val : valGauge }, 
						function( data ) {
							console.log(data);
						}
					);
				}
			});


			function getRandomLatin(){
				var random=Math.floor((Math.random() * textLatin.length));

				return textLatin[random];
			}
        </script>
        
        <style>
        	#moins-gauge,#plus-gauge{
        		cursor : pointer;
        	}
        </style>
	</head>
	<body>
		<div class="container">
			<h1>Chat</h1>
			<div class="row">
				<div class="input-group col-lg-4">
			  		<span class="input-group-addon" id="basic-addon1">Expediteur</span>
			  		<input id="auteur" type="text" class="form-control" placeholder="Auteur" aria-describedby="basic-addon1">
				</div>
			</div>
				
			<div class="row">
				<div class="input-group col-lg-6">
					<textarea id="message" rows="6" class="form-control" style="width : 100%"></textarea>
			  	</div>
			</div>
			
			<div class="row">
				<div class="input-group col-lg-4">
					<button class="btn btn-default" type="submit" id="add_message">Add message</button>
					<button class="btn btn-default pull-right" type="submit" id="randomLatin">Random Text</button>
				</div>
			</div>
			
			<h1 style="margin-top : 50px;">Gauge</h1>
			<div class="row">
				<div class="input-group input-group-lg col-lg-2">
				 	<span class="input-group-addon" id="moins-gauge">-</span>
				  	<input type="text" class="form-control" id="gauge-val" style="text-align : right;">
				  	<span class="input-group-addon" id="plus-gauge">+</span>
				</div>
			</div>
		</div>
	</body>
</html>