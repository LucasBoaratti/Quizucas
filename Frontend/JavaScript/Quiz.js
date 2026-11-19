// Função para recuperar o parâmetro enviado pela página home
function recuperarIDCategoria() {
    const parametros = new URLSearchParams(window.location.search);

    return parametros.get("ID_Categoria");
}

// Buscando os quizes cadastrados no banco de dados
async function getQuizes() {
    // Recuperando o ID da categoria
    const idCategoria = recuperarIDCategoria();

    try {
        // Requisição GET para os quizes, com o parâmetro sendo o ID da categoria

        // Caso a porta for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarQuizes.php
        const response = await axios.get("http://localhost:8080/Quizucas/Backend/Queries/ListarQuizes.php", {
            params: {
                ID_Categoria: idCategoria,
            }
        });

        const quizes = response.data;

        const container = document.getElementById("quizes");
        const modelo = document.getElementById("cards");

        // Verificando se existem quizes disponíveis para a categoria
        if (quizes.length === 0) {
            container.textContent = "Não há quizes disponíveis para essa categoria.";

            // Estilizando a mensagem no container
            container.style.display = "flex";
            container.style.textAlign = "center";
            container.style.marginTop = "2.5rem";
            container.style.color = "#fff";
            container.style.fontWeight = "normal";
            container.style.fontSize = "1.5625rem";

            return;
        }

        quizes.forEach(quiz => {
            const card = modelo.content.cloneNode(true);

            const imagem = card.querySelector(".imagemQuiz");
            const nome = card.querySelector(".nomeQuiz");
            const descricao = card.querySelector(".descricaoQuiz");
            const botaoQuiz = card.querySelector(".botaoQuiz");

            // Colocando a URL da imagem no quiz
            imagem.src = "../" + quiz.Imagem;
            imagem.alt = quiz.Titulo;

            nome.textContent = quiz.Titulo;

            descricao.textContent = quiz.Descricao;

            botaoQuiz.addEventListener("click", () => {
                window.location.href = `./Perguntas.html?ID_Quiz=${quiz.ID_Quiz}`;
            });

            container.appendChild(card);
        });
    }
    catch (error) {
        console.error("Erro ao carregar quizes: ", error);
    }
}

getQuizes();