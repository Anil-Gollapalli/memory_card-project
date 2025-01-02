import React from 'react';
import '../styles/Card.css';

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.imageUrl} alt="Dog" /> {/* Only show the image */}
    </div>
  );
};

export default Card;
