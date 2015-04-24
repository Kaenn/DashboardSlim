$(function(){
	// On affiche le contenu du menu actif
	$("#remote-content .remote-contener[contener-id='"+$("#remote-menu .sidebar-nav .navbar ul.navbar-nav li.active").first().children().first().attr('href')+"']").show();
	
	// Ajout de l'event de changement de menu
	$("#remote-menu .sidebar-nav .navbar ul.navbar-nav li a").on("click",function(){
		$("#remote-menu .sidebar-nav .navbar ul.navbar-nav li.active").removeClass("active");
		$(this).parent().addClass('active');
		
		$("#remote-content .remote-contener").hide();
		$("#remote-content .remote-contener[contener-id='"+$(this).attr('href')+"']").show();
	});
	
	
	
	
	/**********************************************************************************************/
	/************************************ ProgressBar *********************************************/
	/**********************************************************************************************/
	
	
	$('#remote-content .progressBar-slider').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
	
	
	$('#remote-content .remote-contener[contener-id="#progressBar"] button.send').on('click',function(event){
		
		var zabbix=$('#remote-content .progressBar-slider[data-slider-id="progressBar-zabbix"]').val();
		var wpm=$('#remote-content .progressBar-slider[data-slider-id="progressBar-wpm"]').val();
		var oraconsole=$('#remote-content .progressBar-slider[data-slider-id="progressBar-oraconsole"]').val();
		var nagios_sd=$('#remote-content .progressBar-slider[data-slider-id="progressBar-nagios-sd"]').val();
		var typhon=$('#remote-content .progressBar-slider[data-slider-id="progressBar-typhon"]').val();
		var aws=$('#remote-content .progressBar-slider[data-slider-id="progressBar-aws"]').val();
	
		
		$.getJSON( "./ajax/dashboardControl.ajax.php", 
			{ 
				action : "updateProgressBar",
				value : {
					"Zabbix": zabbix,
					"WPM": wpm,
					"Oraconsole": oraconsole,
					"Nagios-SD": nagios_sd,
					"Typhon": typhon,
					"AWS": aws
				},
				color : {
					"Zabbix" : "#5bc0de",
					"WPM" : "rgb(128,133,189)",
					"Oraconsole" : "#04519B",
					"Nagios-SD" : "rgb(153,77,77)",
					"Typhon" : "#FF9999",
					"AWS" : "#7B4F9D"
				}
			}, 
			function( data ) {
				console.log(data);
			}
		);
		
		event.stopPropagation();
		return false;
	});
	
	
	
	
	
	
	
	
	/*$('#add_message').on('click',function(){
		var message=$('#message').val();
		var auteur=$('#auteur').val();
		
		$.getJSON( "./ajax/dashboardControl.ajax.php", 
			{ action : "addMessage", message : message, auteur : auteur }, 
			function( data ) {
				//console.log(data);
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
				//console.log(data);
			}
		);
	}*/
});


var textLatin=[
	"Et prima post Osdroenam quam, ut dictum est, ab hac descriptione discrevimus, Commagena, nunc Euphratensis, clementer adsurgit, Hierapoli, vetere Nino et Samosata civitatibus amplis inlustris.",
	"Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.",
	"Proinde concepta rabie saeviore, quam desperatio incendebat et fames, amplificatis viribus ardore incohibili in excidium urbium matris Seleuciae efferebantur, quam comes tuebatur Castricius tresque legiones bellicis sudoribus induratae.",
	"Ideo urbs venerabilis post superbas efferatarum gentium cervices oppressas latasque leges fundamenta libertatis et retinacula sempiterna velut frugi parens et prudens et dives Caesaribus tamquam liberis suis regenda patrimonii iura permisit.",
	"Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur.",
	"Quanta autem vis amicitiae sit, ex hoc intellegi maxime potest, quod ex infinita societate generis humani, quam conciliavit ipsa natura, ita contracta res est et adducta in angustum ut omnis caritas aut inter duos aut inter paucos iungeretur.",
	"Latius iam disseminata licentia onerosus bonis omnibus Caesar nullum post haec adhibens modum orientis latera cuncta vexabat nec honoratis parcens nec urbium primatibus nec plebeiis."
];

function getRandomLatin(){
	var random=Math.floor((Math.random() * textLatin.length));

	return textLatin[random];
}