<!DOCTYPE html>
<html>
	<head>
		<title>External Remote Controle</title>
            
        <!-- Bootstrap core CSS -->
        <link href="./css/bootstrap-3.3.2/css/bootstrap.min.css" rel="stylesheet">
        <!-- Bootstrap theme -->
        <link href="./css/bootstrap-3.3.2/css/bootstrap-theme-sandstone.min.css" rel="stylesheet">
		
		<link href="./js/bootstrap-slider/css/bootstrap-slider.css" rel="stylesheet">
		
		<link href="./css/remoteControle.css" rel="stylesheet">
		
		<meta name="Author" content="SI, Claranet FR">
		<script type="text/javascript" src="./js/jquery-2.1.3.min.js"></script>
		<script src="./css/bootstrap-3.3.2/js/bootstrap.min.js"></script>
		
		<script type="text/javascript" src="./js/bootstrap-slider/js/bootstrap-slider.js"></script>
		
		<script type="text/javascript" src="./js/remoteControle.js"></script>
      
        <style>
        	#moins-gauge,#plus-gauge{
        		cursor : pointer;
        	}
        </style>
	</head>
	<body>
		<div class="row" id="remote-content">
			<div class="col-sm-3" id="remote-menu">
				<div class="sidebar-nav">
					<div class="navbar navbar-inverse" role="navigation">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<span class="visible-xs navbar-brand">Sidebar menu</span>
						</div>
						<div class="navbar-collapse collapse sidebar-navbar-collapse">
							<ul class="nav navbar-nav">
								<li class="active"><a href="#progressBar">Progresse Bar</a></li>
										
								<li><a href="#gauge">Gauge</a></li>
								
								<li><a href="#alerte">Alerte</a></li>
								
								<li><a href="#checker">Checker</a></li>
								<li><a href="#chat">Chat</a></li>
								
								<li><a href="#scenario">Scenario</a></li>
							</ul>
						</div><!--/.nav-collapse -->
					</div>
				</div>
			</div>
			<div class="col-sm-9" id="remote-content">
				<div>
					<div class="remote-contener" contener-id="#progressBar">
						
						<div class="page-header">
							<h1>Update</h1>
						</div>
						
						<form class="form-horizontal">
	  						<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">Zabbix</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-zabbix' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="30"/>
								</div>
							</div>
							
							<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">WPM</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-wpm' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="20"/>
								</div>
							</div>
							
							<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">Oraconsole</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-oraconsole' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="5"/>
								</div>
							</div>
							
							<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">Nagios-SD</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-nagios-sd' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="10"/>
								</div>
							</div>
							
							<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">Typhon</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-typhon' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="25"/>
								</div>
							</div>
							
							<div class="form-group input-group">
								<span class="input-group-addon" id="basic-addon1">AWS</span>
								<div class="form-control">
									<input class="progressBar-slider"
										data-slider-id='progressBar-aws' 
										type="text" 
										data-slider-min="0" 
										data-slider-max="100" 
										data-slider-step="1" 
										data-slider-value="10"/>
								</div>
							</div>
							
							<button type="submit" class="btn btn-primary send">Envoyer aux clients</button>
						</form>
					</div>
					<div class="remote-contener" contener-id="#gauge">Content gauge</div>
					<div class="remote-contener" contener-id="#alerte">Content alerte</div>
					<div class="remote-contener" contener-id="#checker">Content checker</div>
					<div class="remote-contener" contener-id="#chat">Content chat</div>
					<div class="remote-contener" contener-id="#scenario">Content scenario</div>
				</div>
			</div>
		</div>
		<!-- <div class="container">
			<div class="row">
			<div class="col-sm-4" id="remote-menu">
				<div class="sidebar-nav">
					<div class="navbar navbar-inverse" role="navigation">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<span class="visible-xs navbar-brand">Sidebar menu</span>
						</div>
						<div class="navbar-collapse collapse sidebar-navbar-collapse">
							<ul class="nav navbar-nav">
								<li class="active">
									<a href="#">Chat</a>
								</li>
								<li>
									<a href="#">Gauge1</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-8" id="remote-contente">
				<div class="list-group">
					<ul>
						<li class="list-group-item" style="min-height: 117.777777671814px;">
							<div class="list-group" id="list-group-maintenance">
								<div>
									<a href="#" class="list-group-item active" onclick="showDescMaintenance($(this)); return false;">
										<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>2015-02-27 15:21:48 au 2015-02-28 15:18:18
									</a>
								</div>
								<div>
									<a href="#" class="list-group-item active" onclick="showDescMaintenance($(this)); return false;">
										<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>2015-02-27 11:21:38 au 2015-03-01 11:21:39
									</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		
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
		</div> -->
	</body>
</html>