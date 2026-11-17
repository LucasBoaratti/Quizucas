// Buscando as alternativas
async function getAlternativas(idPergunta) {
    try {
        // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarAlternativas.php
        const response = await axios.get("http://localhost:8080/Quizucas/Backend/Queries/ListarAlternativas.php", {
            params: {
                ID_Pergunta: idPergunta,
            }
        });

        // Armazenando os dados das alternativas
        const alternativas = response.data;

        // Buscando o template e o container das alternativas
        const modelo = document.getElementById("hexagono");
        const container = document.querySelector(".alternativas");

        // Carregando as alternativas para serem exibidas na tela
        alternativas.forEach(alternativa => {
            const modeloAlternativas = modelo.content.cloneNode(true);

            const opcao = modeloAlternativas.querySelector(".alternativa");

            opcao.textContent = alternativa.Texto;

            container.appendChild(modeloAlternativas);
        });
    }
    catch (error) {
        console.log("Erro ao carregar as alternativas: ", error);
    }
}