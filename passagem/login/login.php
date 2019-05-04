<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include '../config/database.php';
$con = getConnection();
if (isset($_POST['login']) AND isset($_POST['senha'])) {
    $login = $_POST['login'];
    $senha = md5($_POST['senha']);
    try {
        $query = "SELECT * FROM usuario WHERE login = ? AND senha = ? LIMIT 0,1";
        $stmt = $con->prepare($query);    
        $stmt->bindParam(1, $login);
        $stmt->bindParam(2, $senha);

        $stmt->execute();
        if($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $result = array('result' => "success", 'dados' => $row );
            $json = json_encode($result);
            echo $json;
        } else{
            // echo json_encode(array('result'=>'fail'));
            $json = json_encode($row);
            echo $json;
        }        
    } catch (PDOException $exception){
        die('ERROR: ' . $exception->getMessage());
    }
} else{
    echo json_encode(array('res' => "Erro ao Acessar"));
}
?>