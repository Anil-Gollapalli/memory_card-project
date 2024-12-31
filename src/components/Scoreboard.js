import React from 'react';
import '../styles/Scoreboard.css';

const Scoreboard = ({ score, bestScore, targetBestScore, gameCount }) => {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <p>Target Best Score: {targetBestScore}</p>
      <p>Game: {gameCount}</p>
    </div>
  );
};

export default Scoreboard;
