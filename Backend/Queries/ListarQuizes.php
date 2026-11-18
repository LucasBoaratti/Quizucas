<?php
    // Definindo os cabeçalhos para permitir requisições de origem autorizada
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Buscando as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Recuperando o ID da categoria enviado pela URL
        $idCategoria = filter_input(INPUT_GET, "ID_Categoria", FILTER_VALIDATE_INT);

        // Verificando se o ID da categoria é inválido
        if (!$idCategoria || $idCategoria <= 0) {
            http_response_code(400);

            echo json_encode([
                "erro" => "ID da categoria inválido."
            ]);

            exit;
        }

        // Consultando os quizzes referentes a categoria selecionada
        $sql = "SELECT ID_Quiz, Titulo, Descricao, Imagem FROM Quiz WHERE ID_Categoria = :ID_Categoria";

        // Preparando a consulta SQL
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(":ID_Categoria", $idCategoria, PDO::PARAM_INT);
        $stmt->execute();

        // Recuperando os registros
        $quizes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($quizes);
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        http_response_code(500);

        echo json_encode([
            "erro" => "Erro ao consultar os quizes.",
        ]);
    }
?>