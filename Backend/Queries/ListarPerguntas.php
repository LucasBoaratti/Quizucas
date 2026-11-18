<?php
    // Definindo os cabeçalhos para permitir requisições de origem autorizada
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Buscando as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Recuperando o ID do quiz
        $idQuiz = filter_input(INPUT_GET, "ID_Quiz", FILTER_VALIDATE_INT);

        // Verificando se o ID do quiz é inválido
        if (!$idQuiz || $idQuiz <= 0) {
            http_response_code(400);

            echo json_encode([
                "erro" => "ID do quiz inválido."
            ]);

            exit;
        }

        // Criando a consulta SQL para recuperar as perguntas do quiz selecionado
        $sql = "SELECT ID_Pergunta, Enunciado FROM Perguntas WHERE ID_Quiz = :ID_Quiz";

        // Preparando e executando a consulta SQL
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(":ID_Quiz", $idQuiz, PDO::PARAM_INT);
        $stmt->execute();
        
        // Recuperando todos os registros das perguntas
        $perguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($perguntas);
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        http_response_code(500);

        echo json_encode([
            "erro" => "Erro ao consultar perguntas.",
        ]);
    }
?>