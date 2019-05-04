<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// used to connect to the database
function getConnection(){
	$host = 'mysql:host=localhost;dbname=passagem;charset=utf8';
	$username = 'root';
	$password = '';

	try {
		$con = new PDO($host, $username, $password);
		return $con;
	}catch(PDOException $exception) {
		echo 'Connection error: ' . $exception->getMessage();
	}	
}

?>