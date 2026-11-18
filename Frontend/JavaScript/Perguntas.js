// Recuperando o ID do quiz na URL
function recuperarURL() {
    const parametros = new URLSearchParams(window.location.search);

    return parametros.get("ID_Quiz");
}

// Função assíncrona para carregar as perguntas e as alternativas
async function getPerguntas() {
    // Recuperando o ID da quiz
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

        // Exibe a primeira pergunta para o usuário (temporário)
        pergunta.textContent = perguntas[0].Enunciado;

        // Chamando a função das alternativas cada vez que surge uma nova pergunta
        await getAlternativas(perguntas[0].ID_Pergunta);
    }
    catch (error) {
        console.error("Erro ao carregar perguntas: ", error);
    }
}

getPerguntas();