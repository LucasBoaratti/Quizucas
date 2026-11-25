// Carregando as categorias para serem exibidas na página home
async function getCategorias() {
    try {
        // Realizando uma requisição HTTP GET para recuperar as categorias cadastradas no banco de dados

        // Caso a porta utilizada pelo APACHE for 8080 ao invés de 80, use essa URL: http://localhost:8080/Quizucas/Backend/Queries/ListarCategorias.php
        const response = await axios.get("http://localhost/Quizucas/Backend/Queries/ListarCategorias.php");
        const categorias = response.data;

        const container = document.getElementById("categorias"); // id do <section></section>
        const modelo = document.getElementById("cards"); // id do <template></template>

        categorias.forEach(categoria => {
            // Clonando o modelo do card
            const card = modelo.content.cloneNode(true);

            const nome = card.querySelector(".nomeCategoria");
            const imagem = card.querySelector(".imagemCategoria");
            const botaoQuiz = card.querySelector(".botaoQuiz");
            
            imagem.src = "../" + categoria.Imagem;
            imagem.alt = categoria.Nome;

            nome.textContent = categoria.Nome;

            // Adicionando um evento de clique para redirecionar o usuário para a página de quizzes
            botaoQuiz.addEventListener("click", () => {
                window.location.href = `./Quiz.html?ID_Categoria=${categoria.ID_Categoria}`;
            });

            container.appendChild(card);
        });
    }
    catch (error) {
        console.error("Erro ao carregar as categorias: ", error);
    }
}

getCategorias();