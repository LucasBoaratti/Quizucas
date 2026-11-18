<?php
    // Definindo os cabeçalhos para permitir requisições de origem autorizada
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Buscando as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Criando a consulta SQL para recuperar as categorias cadastradas
        $sql = "SELECT * FROM categorias";

        // Preparando e executando a consulta SQL
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        // Recuperando todos os registros das categorias
        $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);

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