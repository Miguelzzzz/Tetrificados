<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado</title>
    <link rel="stylesheet" href="../css/resultado.css">
</head>
<body>
<?php include('../../controller/resultado.php');?>
    <main class="container">
        <section>
            Média Decoração: <h2><?php echo $mediaDecoracaoFormatada;?></h2>
            Média Organização: <h2><?php echo $mediaOrganizacaoFormatada;?></h2>
            Média Jogos: <h2><?php echo $mediaJogosFormatada;?></h2>
            Média Apresentação : <h2><?php echo  $mediaApresentacaoFormatada;?></h2>
            Média Geral : <h2><?php echo  $mediaGeralFormatada;?></h2>
        </section>
        <table class="rwd-table">
            <tbody>
            <tr>
                <th>Jogador Nº</th>
                <th>Nome</th>
                <th>Nota Decoração</th>
                <th>Nota Apresentação</th>
                <th>Nota Jogos</th>
                <th>Nota Organização</th>
                <th>Nota Geral</th>
                <th>Complemento</th>
            </tr>
            <?php foreach($resultados as $dados){?>
                <tr>
                    <td data-th="Jogador Nº">
                        <?php echo $dados['codFeed'];?>
                    </td>
                    <td data-th="Nome">
                        <?php echo $dados['nome']; ?>
                    </td>
                    <td data-th="Nota Decoração">
                        <?php echo $dados['notaDecoracao'];?>
                    </td>
                    <td data-th="Nota de Apresentação">
                        <?php echo $dados['notaApresentacao'];?>
                    </td>
                    <td data-th="Nota Jogos">
                        <?php echo $dados['notaJogos'];?>
                    </td>
                    <td data-th="Nota de Organização">
                        <?php echo $dados['notaOrganizacao'];?>
                    </td>
                    <td data-th="Nota Geral">
                        <?php echo $dados['notaGeral'];?>
                    </td>
                    <td data-th="Complemento">
                        <?php echo $dados['compl'];?>
                    </td>
                </tr>
            <?php } ?>
            </tbody>
        </table>
        
    </main>
</body>
</html>