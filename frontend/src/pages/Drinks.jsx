import React, {useEffect, useState} from "react";
import { getDrinks } from "../api";
import DrinkCard from "../components/DrinkCard";
import "./Drinks.css";


const Drinks = () => {
  const [drinks, setDrinks] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(""); // Filter by type: Anime or Video Game
  const [sortOrder, setSortOrder] = useState(""); // Sort by name or type

  useEffect(() => {
    const fetchDrinks = async () => {
     try {
      const drinks = await getDrinks();
      console.log("Drinks:", drinks);
      setDrinks(drinks);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

    fetchDrinks();
  }, [search, filter, sortOrder]);


  //! Filtered & Sorted Drinks
  const filteredDrinks = drinks
     .filter(drink => 
          drink.name.toLowerCase().includes(search.toLowerCase()) || 
          drink.inspiredBy.toLowerCase().includes(search.toLowerCase()) ||
          drink.title.toLowerCase().includes(search.toLowerCase()) ||
          drink.type.toLowerCase().includes(search.toLowerCase())
     )
     .filter(drink => (filter ? drink.inspiredBy === filter : true))
     .sort((a, b) => {
          if (sortOrder === "name") return a.name.localeCompare(b.name);
          if (sortOrder === "Z-A") return b.name.localeCompare(a.name);
          if (sortOrder === "type") return a.type.localeCompare(b.type);
          return 0;
     });


  return (
     <div className="page">
      <h2>Gotta drink'em all</h2>

      {/* Search and Filter */}
      <input 
        type="text" 
        placeholder="Search Drinks..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Anime">Anime</option>
        <option value="Video Game">Video Game</option>
        {/* <option value="Title">Title</option> */}
      </select>

      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Sort By</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Type">Type</option>
      </select>

      {/* Drinks List */}
      <div className="drinks-list">
        {filteredDrinks.map((drink) => (
          <DrinkCard key={drink._id || drink.name} drink={drink} />
        ))}
      </div>
    </div>
//      <div className="page">
//      <h2>Anime & Video Game Inspired Drinks</h2>
//      <div className="drinks-list">
//        {drinks.map((drink) => (
//          <DrinkCard key={drink._id} drink={drink} />
//        ))}
//      </div>
//    </div>
  );
};

export default Drinks;
// Compare this snippet from capstone-project/frontend/src/components/DrinkCard.jsx: