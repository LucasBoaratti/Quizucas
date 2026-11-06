// Carregando as categorias para serem exibidas na página home
fetch("/Quizucas/Backend/Queries/ListarCategorias.php")
    .then(response => response.json())
    .then(categorias => {
        const container = document.getElementById("categorias"); // id do <section></section>
        const modelo = document.getElementById("cards"); // id do <template></template>

        categorias.forEach(categoria => {
            // Clonando o modelo do card
            const card = modelo.content.cloneNode(true);

            const nome = card.querySelector(".nomeCategoria");
            const imagem = card.querySelector(".imagemCategoria");
            
            imagem.src = "../" + categoria.Imagem;
            imagem.alt = categoria.Nome;

            nome.textContent = categoria.Nome;

            // Adicionando o card ao container
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Erro ao carregar as categorias: ", error));