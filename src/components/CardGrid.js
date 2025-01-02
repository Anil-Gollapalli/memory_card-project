import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../styles/CardGrid.css';

const CardGrid = ({ onCardClick, maxClicks }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random/16'); // Fetch 10 random dog images
        const data = response.data.message;

        // Map the data to the expected card format
        const formattedCards = data.map((imageUrl, index) => ({
          id: index + 1, // Create unique IDs
          name: `Dog ${index + 1}`, // Placeholder name
          imageUrl, // Use the image URL from the API
        }));

        setCards(formattedCards); // Set the formatted cards
      } catch (error) {
        console.error('Error fetching data from Dog CEO API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)} // Pass card ID to onCardClick
        />
      ))}
    </div>
  );
};

export default CardGrid;
