// Variável global para mudar o número de vidas em outras partes do arquivo
const quantidadeVidas = 3; // Quantidade atual
let vidasRestantes = quantidadeVidas; // Quantiade restante (será usada na tela de resultados)

// Função para abrir o modal de acerto temporariamente
function abrirModalAcerto() {
    const modalAcerto = document.querySelector(".modalAcerto");

    // Exibe o modal após acertar a pergunta
    modalAcerto.showModal();
    
    // Adiciona um timer de 1 segundo por modal ficar aberto
    setTimeout(() => {
        if (modalAcerto.open) {
            modalAcerto.close();
        }
    }, 1000);
}

// Função para abrir o modal de erro temporariamente
function abrirModalErro() {
    const modalErro = document.querySelector(".modalErro");

    // Exibe o modal após errar a pergunta
    modalErro.showModal();

    setTimeout(() => {
        if (modalErro.open) {
            modalErro.close();
        }
    }, 1000);
}

// Função de gerar vidas para o usuário ter chances de acertar as perguntas
function gerarVidas() {
    const container = document.querySelector(".coracoes");

    // Laço for que irá gerar a quantidade de vidas no início do quiz
    for (let i = 0; i < quantidadeVidas; i++) {
        const vidas = document.createElement("img");

        vidas.classList.add("vidas");
        vidas.src = "./Assets/Elements/Coração.png";
        vidas.alt = "Vida";

        container.appendChild(vidas);
    }
}

// Função para trocar a imagem da vida, caso o usuário erre a pergunta
function trocarVida() {
    const vida = document.querySelectorAll(".vidas");

    // Se o usuário perder uma vida, a imagem é trocada e a vida fica cinza
    if (vidasRestantes > 0) {
        vidasRestantes--;

        vida[vidasRestantes].src = "./Assets/Elements/CoraçãoPerdido.png";
    }
}

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

            const opcao = modeloAlternativas.querySelector(".opcao");

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
                    
                    // Se o usuário acertou a alternativa, abre um modal dizendo que acertou
                    if (respostaAlternativas.correta) {
                        abrirModalAcerto();
                    }
                    // Se ele errou a alternativa, abre um modal dizendo que errou e ele perde uma vida
                    else {
                        abrirModalErro();

                        trocarVida();
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

gerarVidas();