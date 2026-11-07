<?php
    // Query para listar os quizes
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    header("Content-Type: application/json; charset=utf-8");

    try {
        // Recuperando o ID da categoria enviado pela URL
        $idCategoria = filter_input(INPUT_GET, "ID_Categoria", FILTER_VALIDATE_INT);

        // Buscando os quizes referentes a categoria escolhida
        $sql = "SELECT ID_Quiz, Titulo, Descricao, Imagem FROM Quiz WHERE ID_Categoria = :ID_Categoria";

        // Preparando a chamada do SQL
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