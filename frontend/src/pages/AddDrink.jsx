import React, { useState } from 'react'
import { addDrink } from '../api'

const AddDrink = () => {
     const [drink, setDrink] = useState({
        name: '',
        inspiredBy: '',
        type: '',
        recipe: '',
        ingredients: '',
        image: ''
    });

    const handleChange = (e) => {
        setDrink({
            ...drink,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
               await addDrink(drink);
               alert('Drink added successfully!');       
            } catch (error) {
               alert('Failed to add drink!');
            }
    };

    return (
     <div className="page">
      <h2>Add a New Drink</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="type" placeholder="Type" onChange={handleChange} required />
        <input type="text" name="inspiredBy" placeholder="Inspired By" onChange={handleChange} required />
        <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required />
        <input type="text" name="recipe" placeholder="Recipe" onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
        <button type="submit">Add Drink</button>
      </form>
    </div>
     // <div>
     //      <h2>Add a New Drink</h2>
     //      <form onSubmit={handleSubmit}>
     //           <label>Name:</label>
     //           <input type='text' name='name' value={drink.name} onChange={handleChange} required />
     //           <label>Inspired By:</label>
     //           <select name='inspiredBy' value={drink.inspiredBy} onChange={handleChange} required>
     //                <option value=''>Select...</option>
     //                <option value='Anime'>Anime</option>
     //                <option value='Video Game'>Video Game</option>
     //                <option value='Original'>Original</option>
     //           </select>
     //           <label>Type:</label>
     //           <select name='type' value={drink.type} onChange={handleChange} required/>
     //                <option value=''>Select...</option>
     //      </form>
     // </div>
    )
};


export default AddDrink;
