<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include '../config/database.php';
$con = getConnection();
$acao = $_GET['acao'];

switch ($acao) {
    case 'cadUser':
        if (isset($_POST['email']) AND isset($_POST['senha'])) {//SE O EMAIL E SENHA TIVER SETADO
            $email  = $_POST['email'];
            $senha  = md5($_POST['senha']);
            $nome   = $_POST['nome'];
            if (!empty($email)) {
                $query  = "SELECT * FROM usuario WHERE email = ?";
                $stmt   = $con->prepare($query);
                $stmt->bindParam(1, $email);
                $stmt->execute();
                if($row = $stmt->fetch(PDO::FETCH_ASSOC)){ //VERIFICA SE ENCONTROU EMAIL
                    $json = array('result' => "1" );
                    echo json_encode($json);
                } else{ //ELSE CASO NÃO HAVER EMAIL CADASTRADO                    
                    try {
                        $sql = "INSERT INTO usuario (email, senha, nomeusuario) values (?, ?, ?)";
                        $stmt = $con->prepare($sql);
                        $stmt->bindParam(1, $email);
                        $stmt->bindParam(2, $senha);
                        $stmt->bindParam(3, $nome);
                        if($stmt->execute()){//IF SE INSERIU NO BANCO
                            echo json_encode(array('result'=>'success'));
                        } else{ //ELSE SE NÃO INSERIR
                            echo json_encode(array('result'=>'fail'));
                        }                        
                    } catch (PDOException $e) {
                        die('ERROR: ' . $e->getMessage());        
                    }
                }  
            }//VERIFIÇÃO DE EMAIL            
        } else {// CASO NÃO HOUVER POST
            echo json_encode(array('res' => "Erro Inserir"));
        }        
    break;
    
    default:
        # code...
    break;
}
?>