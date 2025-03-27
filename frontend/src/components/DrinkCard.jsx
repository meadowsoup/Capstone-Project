import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DrinkCard.css";


const DrinkCard = ({ drink }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (drink._id) {
      navigate(`/drinks/${drink._id}`);
    } else {
      console.error("Drink does not have an ID:", drink);
    }
  };

  return (
    <div className='drink-card' onClick={handleClick} style={{cursor: 'pointer'}}>
      <h2>{drink.name}</h2>
      <p><strong>Inspired By:</strong> {drink.inspiredBy}</p>
      <p>{drink.title || ''}</p>
      <p><strong>Type:</strong> {drink.type}</p>
      <Link to={`/drinks/${drink._id}`}>View Details</Link>
      <img src={drink.image || "👀"}
      alt={drink.title} />
    </div>
  );
};


export default DrinkCard;