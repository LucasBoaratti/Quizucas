# Quizucas

A **Quizucas** é um jogo onde possui diversos quizzes de diversas categorias para você jogar e se divertir com seus amigos. Esse projeto é um trabalho da disciplina de Desenvolvimento de Sistemas Web 1 do curso de ADS do IFSP Câmpus Hortolândia. O projeto não possui quizzes divididos por dificuldade, a dificuldade irá depender do conhecimento do jogador sobre aquele assunto.

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
│   ├── Config/ # Configurações do banco de dados
|   |   └── DatabaseConfig.php
│   └── Queries/ # Queries/scripts sql de cada tabela
|       ├── ListarAlternativas.php
|       ├── ListarCategorias.php
|       ├── ListarPerguntas.php
|       ├── ListarQuizes.php
|       └── VerificarResposta.php
├── Frontend/
|   ├── Assets/
|   |   ├── Elements/
|   |   |   └── # Elementos decorativos
|   |   ├── Fonts/
|   |   |   └── # Fonte personalizada padrão do projeto   
|   |   ├── ImagensCategorias/
|   |   |   └── # Imagens que representam cada categoria
|   |   ├── ImagensQuiz/
|   |   |   └── # Imagens que representam cada quiz (flyer)
|   |   ├── Background.png
|   |   ├── Favicon.ico
|   |   └── Logomarca.png
|   ├── CSS/ # Arquivos de estilização
|   |   ├── GameOver.css
|   |   ├── Home.css
|   |   ├── Index.css
|   |   ├── Perguntas.css
|   |   ├── Quiz.css
|   |   └── Vitória.css
|   ├── JavaScript/ # Arquivos de script
|   |   ├── Alternativas.js
|   |   ├── GameOver.js
|   |   ├── Home.js
|   |   ├── Perguntas.js
|   |   ├── Quiz.js
|   |   └── Vitória.js
|   ├── GameOver.html
|   ├── Home.html
|   ├── Index.html
|   ├── Perguntas.html
|   ├── Quiz.html
|   └── Vitória.html
├── QuizucasDB.sql # Script SQL para criar o banco de dados e as tabelas do projeto
└── README.md # Arquivo de documentação do projeto
```

# Como rodar o projeto

1. Baixe o xampp, pois ele será responsável por rodar o projeto: [Xampp](https://www.apachefriends.org/pt_br/index.html);

2. Após instalar o xampp, baixe o código do projeto:

```bash
https://github.com/LucasBoaratti/Quizucas.git
```

3. Abra o Prompt de comando (ou PowerShell ou GitBash) na pasta htdocs. Ela provavelmente vai estar em: C:\xampp\htdocs;

OBS: Certifique que o Git está instalado no seu computador. Caso não esteja, instale aqui: [Git](https://git-scm.com/downloads)

```bash 
git clone https://github.com/LucasBoaratti/Quizucas.git
```

4. Após colocar o projeto na pasta htdocs, abra o xampp e ative os servidores do **Apache** e do **MySQL**;

5. Agora, digite **localhost** na URL do navegador, para abrir a pasta do projeto;

6. Agora, encontre a pasta Quizucas, depois vá em Frontend e após isso, o projeto vai abrir. A URL será essa: http://localhost/Quizucas/Frontend/

7. Abra outra guia e digite **localhost/phpmyadmin** para criar o banco de dados do projeto;

8. Cole os scripts SQL presentes no arquivo **QuizucasDB.sql** para criar as tabelas e os dados.

E pronto! Agora volte ao passo 6 e você poderá jogar os quizzes :D