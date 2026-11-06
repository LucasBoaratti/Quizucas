<?php
    // Chamando o arquivo de configurações do banco de dados para usar suas variáveis existentes
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    // Definindo o retorno como JSON
    header("Content-Type: application/json; charset=utf-8");

    try {
        // Criando o comando SQL para chamar as categorias cadastradas
        $sql = "SELECT * FROM categorias";

        $stmt = $connection->prepare($sql);
        $stmt->execute(); // Executa a chamada do SQL

        // Recuperando os registros
        $categorias = $stmt->fetchAll();

        // Retorna os dados em JSON
        echo json_encode($categorias);
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        http_response_code(500);

        echo json_encode([
            "erro" => "Erro ao consultar as categorias.",
        ]);
    }
?>