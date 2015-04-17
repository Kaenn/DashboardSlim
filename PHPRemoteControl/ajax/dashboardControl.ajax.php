<?php

$action=isset($_GET['action']) ? $action=$_GET['action'] : $action=null;


if(method_exists('DashboardControle', $action))
	echo json_encode(DashboardControle::$action());
else
	echo json_encode('Pas de methode trouvee : '.$action);


class DashboardControle{

	public static function addMessage(){
		
		if(isset($_GET['message']) && isset($_GET['auteur'])){
		
			$data=json_encode(array("message" => $_GET['message'],"auteur" => $_GET['auteur']));
			
			$ch = curl_init('http://localhost:8333/RemoteControle/add-message');
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'Content-Length: ' . strlen($data),
				'Accept: application/json',
				'Cache-Control: no-cache' 
			));
			
			$result = curl_exec($ch);
		
			return $result;
		}else{
			return "Param message ou auteur manquant!!!";
		}
	}
	
	
	public static function updateGauge(){
	
		if(isset($_GET['val'])){
	
			$data=json_encode(array("val" => $_GET['val']));
				
			$ch = curl_init('http://localhost:8333/RemoteControle/update-gauge');
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'Content-Length: ' . strlen($data),
				'Accept: application/json',
				'Cache-Control: no-cache'
			));
				
			$result = curl_exec($ch);
	
			return $result;
		}else{
			return "Param val manquant!!!";
		}
	}
	
	
	public static function updateProgressBar(){
	
		if(isset($_GET['value'])){
	
			$data=json_encode(array("value" => $_GET['value']));
				
			$ch = curl_init('http://localhost:8333/RemoteControle/update-progressbar');
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'Content-Length: ' . strlen($data),
				'Accept: application/json',
				'Cache-Control: no-cache'
			));
				
			$result = curl_exec($ch);
	
			return $result;
		}else{
			return "Param value manquant!!!";
		}
	}

}

?>