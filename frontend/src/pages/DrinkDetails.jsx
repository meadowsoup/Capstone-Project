import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DrinkDetails.css";

const API_URL = "http://localhost:4000/api/drinks";

const DrinkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedDrink, setUpdatedDrink] = useState({
    name: "",
    inspiredBy: "",
    type: "",
    recipe: "",
    ingredients: "",
    image: ""
  });

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setDrink(response.data);
        setUpdatedDrink(response.data); // Pre-fill the edit form with the current data
      } catch (error) {
        console.error("Error fetching drink:", error);
        setError("Drink not found.");
      }
    };

    fetchDrink();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedDrink({
      ...updatedDrink,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, updatedDrink);
      alert("Drink updated successfully!");
      setEditMode(false); // Switch back to view mode after updating
    } catch (error) {
      alert("Failed to update drink!");
      console.error("Error updating drink:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this drink?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Drink deleted successfully!");
        navigate("/drinks"); // Redirect to the drinks list after deletion
      } catch (error) {
        alert("Failed to delete drink!");
        console.error("Error deleting drink:", error);
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!drink) {
    return <p>Loading drink...</p>;
  }

  return (
    <div className="drink-details">
      {editMode ? (
        <div>
          <h2>Edit Drink</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={updatedDrink.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="type"
              value={updatedDrink.type}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="inspiredBy"
              value={updatedDrink.inspiredBy}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ingredients"
              value={updatedDrink.ingredients}
              onChange={handleChange}
              required
            />
            <textarea
              name="recipe"
              value={updatedDrink.recipe}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              value={updatedDrink.image}
              onChange={handleChange}
            />
            <button type="submit">Save Changes</button>
          </form>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{drink.name}</h2>
          <p><strong>Inspired By:</strong> {drink.inspiredBy}</p>
          <p><strong>Type:</strong> {drink.type}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {drink.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p><strong>Recipe:</strong> {drink.recipe}</p>
          {drink.image && <img src={drink.image} alt={drink.name} />}
          <button onClick={() => setEditMode(true)}>Edit Drink</button>
          <button onClick={handleDelete}>Delete Drink</button>
        </div>
      )}
    </div>
  );
};

export default DrinkDetails;
