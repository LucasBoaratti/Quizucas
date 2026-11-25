<?php
    require_once dirname(__DIR__, 2) . "/vendor/autoload.php";

    use Dotenv\Dotenv;

    // Recuperando o caminho da raíz do projeto
    $caminhoProjeto = dirname(__DIR__, 2);

    // Carreganho as variáveis do arquivo .env
    $dotenv = Dotenv::createImmutable($caminhoProjeto);
    $dotenv->safeLoad();

    // Informações do banco de dados
    $host = $_ENV['DB_HOST'] ?? "localhost";
    $porta = $_ENV['DB_PORT'] ?? "3306";
    $dbName = $_ENV['DB_NAME'] ?? "quizucas";
    $username = $_ENV['DB_USER'] ?? "root";
    $senha = $_ENV['DB_PASSWORD'] ?? "";

    try {
        // Estabelecendo a conexão com o banco de dados
        $connection = new PDO(
            "mysql:host=$host;port=$porta;dbname=$dbName;charset=utf8mb4",
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