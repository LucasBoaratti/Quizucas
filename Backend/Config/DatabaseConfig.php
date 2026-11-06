<?php
    // Informações do banco de dados
    $hostname = "localhost";
    $username = "root";
    $senha = "lucas"; // OBS: colocar senha do MySQL
    $dbName = "quizucas";

    // Criando a conexão
    try {
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

        // Definindo o formato padrão dos dados
        $connection->setAttribute(
            PDO::ATTR_DEFAULT_FETCH_MODE,
            PDO::FETCH_ASSOC,
        );

        // Utilizando prepared statements nativos
        $connection->setAttribute(
            PDO::ATTR_EMULATE_PREPARES,
            false,
        );
    }
    catch (PDOException $erro) {
        error_log($erro->getMessage());

        die("Erro ao conectar no banco de dados.");
    }
?>