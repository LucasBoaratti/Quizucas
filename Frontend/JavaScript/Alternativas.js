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

            // Evento do botão que verifica se o usuário acertou a resposta
            opcao.addEventListener("click", async () => {
                try {
                    // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarAlternativas.php
                    const responseAlternativas = await axios.post("http://localhost:8080/Quizucas/Backend/Queries/VerificarResposta.php", {
                        ID_Alternativa: alternativa.ID_Alternativa,
                        ID_Pergunta: idPergunta,
                    });

                    const respostaAlternativas = responseAlternativas.data;
                    
                    // Se o usuário acertou a alternativa...
                    if (respostaAlternativas.correta) {
                        // Console.log temporário
                        console.log("Correto!");
                    }
                    else {
                        // Console.log temporário
                        console.log("Errado!");
                    }
                }
                catch (error) {
                    console.error("Erro ao buscar alternativas: ", error);
                }
            });

            container.appendChild(modeloAlternativas);
        });
    }
    catch (error) {
        console.error("Erro ao carregar as alternativas: ", error);
    }
}