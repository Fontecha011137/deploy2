import React, { useState, useEffect } from "react";

const HangmanGame = () => {
  const words = ["react", "javascript", "programa", "ahorcado", "codigo"];
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(7);
  const [wins, setWins] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Inicializa nueva partida
  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setAttemptsLeft(7);
    setGameOver(false);
  };

  // Reinicia todo el juego (incluye contador de partidas ganadas)
  const resetFullGame = () => {
    setWins(0);
    startNewGame();
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;
    setGuessedLetters((prev) => [...prev, letter]);
    if (!word.includes(letter)) {
      setAttemptsLeft((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const isWordGuessed = word.split("").every((letter) => guessedLetters.includes(letter));
    if (isWordGuessed && !gameOver) {
      setWins((prev) => prev + 1);
      setGameOver(true);
    } else if (attemptsLeft <= 0) {
      setGameOver(true);
    }
  }, [guessedLetters, attemptsLeft]);

  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <span className="letter" key={index}>
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ));
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="game-container">
      <h1>Juego del Ahorcado</h1>
      <p>Intentos restantes: <strong>{attemptsLeft}</strong></p>
      <p>Partidas ganadas: <strong>{wins}</strong></p>

      <div className="word">{renderWord()}</div>

      <div className="keyboard">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameOver}
            className={`key ${guessedLetters.includes(letter) ? "used" : ""}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="result">
          {attemptsLeft > 0 ? (
            <h2>¡Ganaste! 🎉</h2>
          ) : (
            <h2>Perdiste 😢 La palabra era: <em>{word}</em></h2>
          )}

          <button className="restart-button" onClick={startNewGame}>
            Reiniciar Ronda
          </button>

          <button className="reset-button" onClick={resetFullGame}>
            Reiniciar Juego Completo
          </button>
        </div>
      )}
    </div>
  );
};

export default HangmanGame;
