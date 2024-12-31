import React from 'react';
import '../styles/Card.css';

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.imageUrl} alt={card.name} />
      <div>{card.name}</div>
    </div>
  );
};

export default Card;
