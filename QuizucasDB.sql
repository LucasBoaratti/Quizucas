CREATE DATABASE Quizucas;

USE Quizucas;

CREATE TABLE Categorias (
	ID_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Imagem VARCHAR(255)
);

CREATE TABLE Quiz (
	ID_Quiz INT AUTO_INCREMENT PRIMARY KEY,
    ID_Categoria INT NOT NULL,
    Titulo VARCHAR(100) NOT NULL,
    Descricao VARCHAR(100),
    Imagem VARCHAR(255),
    
    FOREIGN KEY (ID_Categoria) REFERENCES Categorias(ID_Categoria)
);

CREATE TABLE Perguntas (
	ID_Pergunta INT AUTO_INCREMENT PRIMARY KEY,
    ID_Quiz INT NOT NULL,
    Enunciado VARCHAR(100) NOT NULL,
    
    FOREIGN KEY (ID_Quiz) REFERENCES Quiz(ID_Quiz)
);

CREATE TABLE Alternativas (
	ID_Alternativa INT AUTO_INCREMENT PRIMARY KEY,
    ID_Pergunta INT NOT NULL,
    Texto VARCHAR(255),
    Correta BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (ID_Pergunta) REFERENCES Perguntas(ID_Pergunta)
);

-- Inserindo as categorias na tabela Categorias

INSERT INTO Categorias (Nome, Imagem) VALUES
("Jogos", "Frontend/Assets/ImagensCategorias/CategoriaJogos.png"),
("Linguagens de programação", "Frontend/Assets/ImagensCategorias/CategoriaLinguagemDeProgramação.png"),
("Matemática", "Frontend/Assets/ImagensCategorias/CategoriaMatematica.png"),
("Geografia", "Frontend/Assets/ImagensCategorias/CategoriaGeografia.png"),
("Animais", "Frontend/Assets/ImagensCategorias/CategoriaAnimais.png"),
("Filmes/séries", "Frontend/Assets/ImagensCategorias/CategoriaFilmes.png"),
("Esportes", "Frontend/Assets/ImagensCategorias/CategoriaEsportes.png"),
("Musicas", "Frontend/Assets/ImagensCategorias/CategoriaMusicas.png"),
("Corpo humano", "Frontend/Assets/ImagensCategorias/CategoriaCorpoHumano.png");

SELECT * FROM Categorias;

-- Inserindo os quizes de acordo com suas categorias

INSERT INTO Quiz (ID_Categoria, Titulo, Descricao, Imagem) VALUES
(1, "Minecraft", "Você conhece tudo sobre esse mundo quadrado? Então venha testar seus conhecimentos!", "Frontend/Assets/ImagensQuiz/QuizMinecraft.png"),
(1, "Hollow Knight", "Você já jogou Hollow Knight? Então venha testar seus conhecimentos nesse quiz!", "Frontend/Assets/ImagensQuiz/QuizHollowKnight.png"),
(2, "PHP", "Você conhece a linguagem PHP? Então esse quiz foi feito pra você!", "Frontend/Assets/ImagensQuiz/QuizPHP.png"),
(2, "Linguagem C", "Você conhece as linguagens de baixo nível? Se não, venha jogar esse quiz em C!", "Frontend/Assets/ImagensQuiz/QuizLinguagemC.jpg"),
(3, "Funções", "Você conhece funções matemáticas? Venha jogar esse quiz para testar seus conhecimentos!", "Frontend/Assets/ImagensQuiz/QuizFunções.webp"),
(3, "Cálculo", "O terror dos matemáticos!! Teste seus conhecimentos em conteúdos de cálculo 1, 2 e 3.", "Frontend/Assets/ImagensQuiz/QuizCálculo.png"),
(4, "Países asiáticos", "Você sabe quais são os países asiáticos? Então venha descobrir quais são eles.", "Frontend/Assets/ImagensQuiz/QuizÁsia.jpg"),
(4, "Países africanos", "Você conhece os países da áfrica? Se sim, venha testar seus conhecimentos!", "Frontend/Assets/ImagensQuiz/QuizÁfrica.jpg"),
(5, "Cachorros", "Você ama seu doginho? Então venha testar seus conhecimentos sobre eles!", "Frontend/Assets/ImagensQuiz/QuizCachorros.jpg"),
(5, "Gatos", "Você gosta de gatos? Pois se você AMA eles, faça esse quiz e seja feliz!", "Frontend/Assets/ImagensQuiz/QuizGatos.jpg"),
(6, "Vingadores", "Você é fã de vingadores? Então faça esse quiz sobre cada um dos heróis mais queridos do cinema!", "Frontend/Assets/ImagensQuiz/QuizVingadores.jpg"),
(6, "Harry Potter", "Você gosta de magia e bruxaria? Esse quiz de Harry Potter é perfeito pra você!", "Frontend/Assets/ImagensQuiz/QuizHarryPotter.png"),
-- Obs: a categoria esportes ficará vazia para visualizar como fica uma categoria sem quizzes (exibe uma mensagem pro usuário informando que não há quizzes disponíveis para a categoria :D)
(8, "Músicas anos 2000", "Você conhece as músicas das antigas? Então venha testar seu conhecimento nesse quiz!", "Frontend/Assets/ImagensQuiz/QuizMusicasAnos2000.jpg"),
(8, "Músicas pop", "Você conhece o gênero de música pop? Se sim, venha testar seu conhecimento de músicas do gênero!", "Frontend/Assets/ImagensQuiz/QuizMusicaPop.webp"),
(9, "Sistema nervoso", "Venha explorar mais sobre você mesmo! Conheça sobre o sistema nervoso, um dos sistemas centrais do corpo!", "Frontend/Assets/ImagensQuiz/QuizSistemaNervoso.webp"),
(9, "Sistema digestivo", "Explore seu corpo, fazendo o quiz do sistema digestivo, onde ocorre o tráfego das comidas e bebidas!", "Frontend/Assets/ImagensQuiz/QuizSistemaDigestivo.webp");