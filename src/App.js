import React, { useState, useEffect } from 'react';
import CardGrid from './components/CardGrid';
import Scoreboard from './components/Scoreboard';
import './styles/App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [targetBestScore, setTargetBestScore] = useState(15); // Initial random best score
  const [clickedCards, setClickedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameCount, setGameCount] = useState(1);
  const [clickLimit, setClickLimit] = useState(10); // Start with 10 attempts

  // Handle card click
  const handleCardClick = (cardId) => {
    if (clickedCards.has(cardId)) {
      setGameOver(true); // Game over if a card is clicked twice
      return;
    }

    setClickedCards((prev) => new Set(prev).add(cardId));
    const newScore = score + 1;
    setScore(newScore);

    if (clickedCards.size + 1 >= clickLimit) {
      setGameOver(true); // End game if limit is reached
    }

    // Update best score if player exceeds it
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  // Reset game logic
  const resetGame = () => {
    const newTargetBestScore = Math.max(targetBestScore, bestScore) + Math.floor(Math.random() * 10) + 5; // Randomize target score

    setScore(0);
    setClickedCards(new Set());
    setGameOver(false);
    setGameCount((prev) => prev + 1); // Increment game count
    setClickLimit(clickLimit + 5); // Increase the click limit after each game
    setTargetBestScore(newTargetBestScore); // Update the target best score
  };

  // Effect for handling game-over scenario
  useEffect(() => {
    if (gameOver) {
      const timer = setTimeout(() => {
        resetGame();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [gameOver]);

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard
        score={score}
        bestScore={bestScore}
        targetBestScore={targetBestScore}
        gameCount={gameCount}
      />
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Best Score: {bestScore}</p>
          <p>Game: {gameCount}</p>
          <p>Target Best Score for Next Game: {targetBestScore}</p>
        </div>
      ) : (
        <CardGrid onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default App;
