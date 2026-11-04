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