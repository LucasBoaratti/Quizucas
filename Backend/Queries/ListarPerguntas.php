<?php
    // Chamadas de cabeçalho para o CORS não bloquear
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Busca as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Recuperando o ID do quiz
        $idQuiz = filter_input(INPUT_GET, "ID_Quiz", FILTER_VALIDATE_INT);

        // Query para selecionar as perguntas referentes ao quiz escolhido
        $sql = "SELECT ID_Pergunta, Enunciado FROM Perguntas WHERE ID_Quiz = :ID_Quiz";

        // Preparando e lançando a chamada SQL
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(":ID_Quiz", $idQuiz, PDO::PARAM_INT);
        $stmt->execute();
        
        // Recupera os registros
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