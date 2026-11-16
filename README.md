# Quizucas

A Quizucas é um jogo onde possui diversos quizzes de diversas categorias para você jogar e se divertir com seus amigos. Esse projeto é um trabalho da disciplina de Desenvolvimento de Sistemas Web 1 do curso de ADS do IFSP Câmpus Hortolândia. O projeto não possui quizzes divididos por dificuldade, a dificuldade irá depender do conhecimento do jogador sobre aquele assunto.

# Funcionalidades

- Botão start para iniciar o jogo;
- Lista de categorias para o jogador escolher a categoria desejada;
- Lista de quizzes de acordo com a categoria escolhida pelo jogador;
- X perguntas do quiz escolhido pelo jogador para responder, com 4 alternativas cada;
- 3 pontos de vida para o jogador, que diminuem a cada resposta errada;
- Caso o jogador perca todos as vidas, aparece game over e o usuário escolhe se quer refazer ou sair do quiz;
- Caso o jogador responda todas as perguntas corretamente, aparece a tela de vitória com o restante de vidas sobradas e poderá escolher entre refazer o quiz ou sair.

# Tecnologias utilizadas

<div style="display: flex; gap: 10px;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" title="HTML" width="70px" height="70px" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" title="CSS" width="70px" height="70px" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" title="JavaScript" width="70px" height="70px" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="PHP" title="PHP" width="70px" height="70px" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" title="MySQL" width="70px" height="70px" />
</div>

# Estrutura do Projeto

```text
Quizucas/
├── Backend/
│   ├── Config/
|   |   └── DatabaseConfig.php
│   └── Queries/
|       ├── ListarCategorias.php
|       └── ListarQuizes.php
├── Frontend/
|   ├── Assets/
|   |   ├── Elements/
|   |   ├── Fonts/
|   |   ├── ImagensCategorias/
|   |   ├── ImagensQuiz/
|   |   ├── Background.png
|   |   ├── Favicon.ico
|   |   └── Logomarca.png
|   ├── CSS/
|   ├── JavaScript
|   ├── Home.html
|   ├── Index.html
|   └── Quiz.html
├── QuizucasDB.sql
└── README.md
```