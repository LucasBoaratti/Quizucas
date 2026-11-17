// Recuperando o ID do quiz na URL
function recuperarURL() {
    const parametros = new URLSearchParams(window.location.search);

    return parametros.get("ID_Quiz");
}

// Função assíncrona para carregar as perguntas e as alternativas
async function getPerguntas() {
    const idQuiz = recuperarURL();

    try {
        // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarPerguntas.php
        const response = await axios.get("http://localhost:8080/Quizucas/Backend/Queries/ListarPerguntas.php", {
            params: {
                ID_Quiz: idQuiz,
            }
        });

        // Armazenando os dados das perguntas
        const perguntas = response.data;

        // Buscando o elemento da pergunta
        const pergunta = document.getElementById("pergunta");

        pergunta.textContent = perguntas[0].Enunciado;
    }
    catch (error) {
        console.log("Erro ao carregar perguntas: ", error);
    }
}

getPerguntas();