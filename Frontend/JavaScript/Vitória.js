function jogarNovamenteVitoria() {
    // Recupera o botão pela classe do HTML
    const jogarNovamenteVitoria = document.querySelector("#botaoJogarNovamente");

    jogarNovamenteVitoria.addEventListener("click", function() {
        // Recupera o ID do quiz pelo parâmetro
        const idQuiz = new URLSearchParams(window.location.search).get("ID_Quiz");

        // Leva ao início da página de perguntas, com o ID do quiz
        window.location.href = `./Perguntas.html?ID_Quiz=${idQuiz}`;
    });
}

jogarNovamenteVitoria();