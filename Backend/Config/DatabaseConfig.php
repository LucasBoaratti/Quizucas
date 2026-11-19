<?php
    // Informações do banco de dados
    $hostname = "localhost";
    $username = "root";
    $senha = ""; // OBS: colocar senha, se for usar o MySQL (caso tenha configurado uma)
    $dbName = "quizucas";

    try {
        // Estabelecendo a conexão com o banco de dados
        $connection = new PDO(
            "mysql:host=$hostname;dbname=$dbName;charset=utf8mb4",
            $username,
            $senha,
        );

        // Configurando o tratamento de erros
        $connection->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION,
        );

        // Definindo o modo padrão de recuperação dos dados
        $connection->setAttribute(
            PDO::ATTR_DEFAULT_FETCH_MODE,
            PDO::FETCH_ASSOC,
        );

        // Desabilitando a emulação de prepared statements
        $connection->setAttribute(
            PDO::ATTR_EMULATE_PREPARES,
            false,
        );
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        die(json_encode([
            "erro" => "Erro ao conectar no banco de dados.",
        ]));
    }
?>