<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include '../config/database.php';
$con = getConnection();
$acao = $_GET['acao'];

switch ($acao) {
    case 'cadUser':
        if (isset($_POST['login']) AND isset($_POST['senha'])) {
            $login  = $_POST['login'];
            $senha  = md5($_POST['senha']);
            $nome   = $_POST['nome'];
            $cpf    = $_POST['cpf'];
            $tel    = $_POST['tel'];
            $end    = $_POST['end'];
            try {
                $sql = "INSERT INTO usuario (login, senha, nomeusuario, cpf, celular, logradouro) values (?, ?, ?, ?, ?, ?)";
                $stmt = $con->prepare($sql);
                $stmt->bindParam(1, $login);
                $stmt->bindParam(2, $senha);
                $stmt->bindParam(3, $nome);
                $stmt->bindParam(4, $cpf);
                $stmt->bindParam(5, $tel);
                $stmt->bindParam(6, $end);
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