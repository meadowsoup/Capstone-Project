import React from "react";


const DrinkCard = ({ drink }) => {
  return (
    <div className='drink-card'>
      <h2>{drink.name}</h2>
      <p><strong>Inspired By:</strong> {drink.inspiredBy}</p>
      <p>{drink.title || ''}</p>
      <p><strong>Type:</strong> {drink.type}</p>
      <img src={drink.image} />
    </div>
  );
};


export default DrinkCard;