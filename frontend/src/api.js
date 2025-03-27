import axios from 'axios';


const API_URL = 'http://localhost:4000/api/drinks';

export const getDrinks = async () => {
     try {
          const response = await axios.get(`${API_URL}?timestamp=${new Date().getTime()}`);
          return response.data;
     } catch (error) {
          console.error("Error fetching drinks:", error);
          throw error;
     }
};

export const addDrink = async (drink) => {
     try {
          const token = localStorage.getItem("token");
          const response = await axios.post(`${API_URL}`, drink, {
               headers: {
                    'Content-Type': 'application/json'
               },
               withCredentials: true
          });
          return response.data;
     } catch (error) {
          console.error("Error adding drink:", error);
          throw error;
     }
};

// export const deleteDrink = async (id) => {