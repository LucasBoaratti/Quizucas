<?php
    // Definindo os cabeçalhos para permitir requisições de origem autorizada
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Buscando as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Recupera o ID da pergunta
        $idPergunta = filter_input(INPUT_GET, "ID_Pergunta", FILTER_VALIDATE_INT);

        // Verificando se o ID da pergunta é inválido
        if (!$idPergunta || $idPergunta <= 0) {
            http_response_code(400);

            echo json_encode([
                "erro" => "ID da pergunta inválido."
            ]);
            
            exit;
        }

        // Criando a consulta SQL para recuperar as alternativas da pergunta selecionada
        $sql = "SELECT ID_Alternativa, Texto FROM Alternativas WHERE ID_Pergunta = :ID_Pergunta";

        // Preparando e executando a consulta SQL
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(":ID_Pergunta", $idPergunta, PDO::PARAM_INT);
        $stmt->execute();

        // Recuperando os registros das alternativas
        $alternativas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($alternativas);
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        http_response_code(500);

        echo json_encode([
            "erro" => "Erro ao consultar as alternativas.",
        ]);
    }
?>