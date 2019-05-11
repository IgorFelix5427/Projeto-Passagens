<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include '../config/database.php';
$con = getConnection();
$acao = $_GET['acao'];

switch ($acao) {
    case 'cadUser':
        if (isset($_POST['email']) AND isset($_POST['senha'])) {
            $email  = $_POST['email'];
            $senha  = md5($_POST['senha']);
            $nome   = $_POST['nome'];
            try {
                $sql = "INSERT INTO usuario (email, senha, nomeusuario) values (?, ?, ?)";
                $stmt = $con->prepare($sql);
                $stmt->bindParam(1, $email);
                $stmt->bindParam(2, $senha);
                $stmt->bindParam(3, $nome);
                if($stmt->execute()){
                    echo json_encode(array('result'=>'success'));
                }else{
                    echo json_encode(array('result'=>'fail'));
                }
                
            } catch (PDOException $e) {
                die('ERROR: ' . $e->getMessage());        
            }
        } else{
            echo json_encode(array('res' => "Erro Inserir"));
        }        
    break;
    
    default:
        # code...
    break;
}
?>