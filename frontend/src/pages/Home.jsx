import { useState, useEffect } from "react";
import { getDrinks } from "../api";

function Home() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function loadDrinks() {
      try {
        const data = await getDrinks();
        setDrinks(data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    }
    loadDrinks();
  }, []);

  return (
    <div>
      <h1>Gotta drink'em all</h1>
      <ul>
        {drinks.map((drink) => (
          <li key={drink._id}>
            <h2>{drink.name}</h2>
            <p><strong>Inspired By:</strong> {drink.inspiredBy}</p>
            <img src={drink.imageURL} alt={drink.name} width="200px" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
