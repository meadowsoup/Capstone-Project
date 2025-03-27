import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Drinks from './pages/Drinks'
import AddDrink from './pages/AddDrink'
import About from './pages/About'
import './App.css'
import DrinkDetails from './pages/DrinkDetails'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/drinks' element={<Drinks />} />
        <Route path='/add-drink' element={<AddDrink />} />
        <Route path='/about' element={<About />} />
        <Route path='/drinks/:id' element={<DrinkDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
