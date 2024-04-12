<?php 
class conexao{
    private $pdo;
    public function __construct($dbname, $host, $user, $password) {
        try {
            $this -> pdo = New PDO ("mysql:dbname=" . $dbname . ";host=" . $host, $user, $password);
            return "CONEXÃO DO PDO";
        } catch (PDOException $erro) {
            return "ERRO DE CONEXÃO NO PDO:" . $erro -> getMessage();
            exit();
        } catch (Exception $erro) {
            return "ERRO NÃO PASSOU DA CONEXÃO:" . $erro -> getMessage();
            exit();
        }
    }

    public function insereValores($cadNome, $cadNotaGeral, $cadNotaJogo, $cadNotaOrganizacao,$cadNotaApresentacao, $cadNotaDecoracao, $cadCompl){
        $insereValores = $this -> pdo -> prepare ("insert into feedBack(nome,notaGeral, notaJogos,notaOrganizacao,notaApresentacao, notaDecoracao,compl)
        values(:n, :g, :j, :o, :a, :d, :c)");

        $insereValores -> bindValue(":n", $cadNome);
        $insereValores -> bindValue(":g", $cadNotaGeral);
        $insereValores -> bindValue(":j", $cadNotaJogo);
        $insereValores -> bindValue(":o", $cadNotaOrganizacao);
        $insereValores -> bindValue(":a", $cadNotaApresentacao);
        $insereValores -> bindValue(":d", $cadNotaDecoracao);
        $insereValores -> bindValue(":c",$cadCompl);
        $insereValores->execute();
    }
    
    public function consultaBanco($sql){
        $consultaSQL = $this->pdo->query($sql);
        $consultaSQL->execute();
        $resultados = array();
    
        while ($dados = $consultaSQL->fetch(PDO::FETCH_ASSOC)) {
            $resultados[] = $dados;
        }
        return $resultados;
    }

}

?>
