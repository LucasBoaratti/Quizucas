// Armazenando todas as perguntas recuperadas no banco de dados
let perguntas = [];

// Índice que indica qual pergunta está sendo exibida
let indicePergunta = 0;

// Recuperando o ID do quiz na URL
function recuperarIDQuiz() {
    const parametros = new URLSearchParams(window.location.search);

    return parametros.get("ID_Quiz");
}

// Função para exibir as perguntas e suas alternativas
async function exibirPergunta() {
    // Recuperando a pergunta de acordo com o índice atual e pega o ID da pergunta no HTML
    const perguntaAtual = perguntas[indicePergunta];
    const pergunta = document.getElementById("pergunta");

    // Exibindo o enunciado da pergunta
    pergunta.textContent = perguntaAtual.Enunciado;

    // Buscando as alternativas da pergunta atual
    await getAlternativas(perguntaAtual.ID_Pergunta);
}

// Função que avança para a próxima pergunta
async function avancarPergunta() {
    // Aumentando o índice da pergunta atual
    indicePergunta++;

    // Verificando se ainda existem perguntas
    if (indicePergunta < perguntas.length) {
        // Exibindo a próxima pergunta
        await exibirPergunta();
    }
    // Se não existir mais perguntas, o quiz acaba e avança para a tela de vitória
    else {
        // Recuperando o ID do quiz
        const idQuiz = recuperarIDQuiz();

        window.location.href = `./Vitoria.html?ID_Quiz=${idQuiz}`;
    }
}

// Função assíncrona para carregar as perguntas e as alternativas
async function getPerguntas() {
    // Recuperando o ID do quiz
    const idQuiz = recuperarIDQuiz();

    try {
        // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarPerguntas.php
        const response = await axios.get("http://localhost/Quizucas/Backend/Queries/ListarPerguntas.php", {
            params: {
                ID_Quiz: idQuiz,
            }
        });

        // Armazenando os dados das perguntas
        perguntas = response.data;

        const pergunta = document.getElementById("pergunta");

        // Caso o quiz não possuia nenhuma pergunta...
        if (perguntas.length === 0) {
            pergunta.textContent = "Nenhuma pergunta encontrada.";

            pergunta.style.display = "flex";
            pergunta.style.justifyContent = "center";
            pergunta.style.margin = "1.875rem 0"
            pergunta.style.color = "#fff"
            pergunta.style.fontSize = "1.125rem";

            return;
        }

        // Reiniciando o índice das perguntas
        indicePergunta = 0;

        // Exibindo a primeira pergunta
        await exibirPergunta();

        console.log("ID do quiz recebido:", idQuiz);
        console.log("Resposta do PHP:", response.data);
        console.log("Quantidade de perguntas:", response.data.length);
    }
    catch (error) {
        console.error("Erro ao carregar perguntas: ", error);
    }
}

getPerguntas();