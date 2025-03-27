import React, { useState } from 'react';
import { addDrink } from '../api';
import { useNavigate } from 'react-router-dom';
import './AddDrink.css';

const AddDrink = () => {
  const [drink, setDrink] = useState({
    name: '',
    inspiredBy: '',
    type: '',
    recipe: '',
    ingredients: '',
    image: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDrink({
      ...drink,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const formattedDrink = {
      ...drink,
      ingredients: drink.ingredients.split(',').map((ingredient) => ingredient.trim())
    };

    if (!formattedDrink.name || !formattedDrink.type || !formattedDrink.inspiredBy || !formattedDrink.ingredients.length || !formattedDrink.recipe) {
      setErrorMessage('All fields except Image are required.');
      return;
    }


    try {
      await addDrink(formattedDrink);
      alert('Drink added successfully!');
      navigate('/drinks');
    } catch (error) {
      alert('Failed to add drink!');
    }
  };

  return (
    <div className="page">
      <h2>Add a New Drink</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={drink.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Cocktail, Mock-tail, Other)"
          value={drink.type}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="inspiredBy"
          placeholder="Inspired By (Video Game, Anime, etc.)"
          value={drink.inspiredBy}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={drink.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="recipe"
          placeholder="Recipe"
          value={drink.recipe}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={drink.image}
          onChange={handleChange}
        />
        {drink.image && <img src={drink.image} alt="Drink preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
        <button type="submit">Add Drink</button>
      </form>
    </div>
  );
};

export default AddDrink;
