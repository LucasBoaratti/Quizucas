// Variável global que define a quantidade total de vidas
const quantidadeVidas = 3; // Quantidade inicial de vidas
let vidasRestantes = quantidadeVidas; // Quantidade restante (será usada na tela de resultados)

// Função para abrir o modal de acerto temporariamente
function abrirModalAcerto() {
    const modalAcerto = document.querySelector(".modalAcerto");

    // Exibe o modal após acertar a pergunta
    modalAcerto.showModal();
    
    // Agendando o fechamento de 1 segundo pro modal ficar aberto
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
    
    // Caso todas as vidas acabem, o usuário vai para a tela de game over
    if (vidasRestantes === 0) {
        // Recuperando a URL para adicionar o ID do quiz no parâmetro da tela de gameover, para voltar ao início do quiz, posteriormente
        const idQuiz = recuperarIDQuiz();

        // Aguardando 1 segundo antes de ir para a tela de game over
        setTimeout(() => {
            window.location.href = `./GameOver.html?ID_Quiz=${idQuiz}`;
        }, 1000);
    }
}

// Função assíncrona responsável por buscar e exibir as alternativas da pergunta.
async function getAlternativas(idPergunta) {
    try {
        // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarAlternativas.php
        const response = await axios.get("http://localhost/Quizucas/Backend/Queries/ListarAlternativas.php", {
            params: {
                ID_Pergunta: idPergunta,
            }
        });

        // Armazenando os dados das alternativas
        const alternativas = response.data;

        // Buscando o template e o container das alternativas
        const modelo = document.getElementById("hexagono");
        const container = document.querySelector(".alternativas");

        // Removendo as alternativas anteriores
        container.querySelectorAll(".opcao").forEach(opcao => {
            opcao.remove();
        });

        // Carregando as alternativas para serem exibidas na tela
        alternativas.forEach(alternativa => {
            const modeloAlternativas = modelo.content.cloneNode(true);

            const opcao = modeloAlternativas.querySelector(".opcao");

            opcao.textContent = alternativa.Texto;

            // Evento do botão que verifica se o usuário acertou a resposta
            opcao.addEventListener("click", async () => {
                try {
                    // CCaso a porta utlizada pelo APACHE for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/VerificaRespostas.php
                    const responseAlternativas = await axios.post("http://localhost/Quizucas/Backend/Queries/VerificarResposta.php", {
                        ID_Alternativa: alternativa.ID_Alternativa,
                        ID_Pergunta: idPergunta,
                    });

                    const respostaAlternativas = responseAlternativas.data;
                    
                    // Se o usuário acertou a alternativa, abre um modal dizendo que acertou
                    if (respostaAlternativas.correta) {
                        abrirModalAcerto();

                        // Exibindo a pergunta após um segundo
                        setTimeout(() => {
                            avancarPergunta();
                        }, 1000);
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

// Chamando a função de gerar vidas
gerarVidas();