<?php
    // Definindo os cabeçalhos para permitir requisições de origem autorizada
    header("Access-Control-Allow-Origin: http://localhost:8080");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");    
    header("Content-Type: application/json; charset=utf-8");

    // Buscando as configurações do banco de dados
    require_once __DIR__ . "/../Config/DatabaseConfig.php";

    try {
        // Recupera os dados enviados pelo javascript
        $dados = json_decode(file_get_contents("php://input"), true);

        // Recuperando o ID da alternativa
        $idAlternativa = filter_var($dados["ID_Alternativa"] ?? null, FILTER_VALIDATE_INT);

        // Recuperando o ID da pergunta
        $idPergunta = filter_var($dados["ID_Pergunta"] ?? null, FILTER_VALIDATE_INT);

        // Verificando se o ID da alternativa e da pergunta são inválidos
        if (!$idAlternativa || $idAlternativa <= 0 || !$idPergunta || $idPergunta <= 0) {
            http_response_code(400);
            
            echo json_encode([
                "erro" => "Alternativa inválida.",
            ]);

            exit;
        }

        // Consultando o campo que indica se a alternativa, que pertence a pergunta, está correta
        $sql = "SELECT Correta FROM Alternativas WHERE ID_Alternativa = :ID_Alternativa AND ID_Pergunta = :ID_Pergunta";

        // Preparando e executando o comando SQL
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(":ID_Alternativa", $idAlternativa, PDO::PARAM_INT);
        $stmt->bindValue(":ID_Pergunta", $idPergunta, PDO::PARAM_INT);
        $stmt->execute();

        // Recuperando o registro da alternativa consultada
        $alternativa = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificando se a alternativa não foi encontrada
        if (!$alternativa) {
            http_response_code(404);

            echo json_encode([
                "erro" => "Alternativa não encontrada.",
            ]);

            exit;
        }

        // Retornando a verificação da alternativa
        echo json_encode([
            "correta" => (bool) $alternativa["Correta"],
        ]);
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        http_response_code(500);

        echo json_encode([
            "erro" => "Erro ao consultar alternativa.",
        ]);
    }
?>