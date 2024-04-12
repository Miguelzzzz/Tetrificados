<?php
     require_once (__DIR__.'/../model/conexao.php');
     $config = parse_ini_file(__DIR__.'/../model/config.ini');
     $conexao = new conexao ($config['dbname'], $config['host'], $config['user'], $config['password']);
 
    $sql = 'SELECT * FROM feedBack'; 
    $resultados = $conexao -> consultaBanco($sql);

    $contador = 0;
    $totalDecoracao = 0;
    $totalGeral = 0;
    $totalJogos = 0;
    $totalOrganizacao = 0;
    $totalApresentacao = 0;

    foreach($resultados as $dados){
        $totalDecoracao += $dados['notaDecoracao'];
        $totalGeral += $dados['notaGeral'];
        $totalJogos += $dados['notaJogos'];
        $totalOrganizacao += $dados['notaOrganizacao'];
        $totalApresentacao += $dados['notaApresentacao'];
        $contador++;
    }

    $mediaDecoracao = $totalDecoracao / $contador;
    $mediaGeral = $totalGeral / $contador;
    $mediaOrganizacao = $totalOrganizacao / $contador;
    $mediaJogos = $totalJogos / $contador;
    $mediaApresentacao = $totalApresentacao / $contador;

    $mediaDecoracaoFormatada = number_format($mediaDecoracao, 2); // Duas casas decimais
    $mediaGeralFormatada = number_format($mediaGeral, 2);
    $mediaOrganizacaoFormatada = number_format($mediaOrganizacao, 2);
    $mediaJogosFormatada = number_format($mediaJogos, 2);
    $mediaApresentacaoFormatada = number_format($mediaApresentacao, 2);
?>