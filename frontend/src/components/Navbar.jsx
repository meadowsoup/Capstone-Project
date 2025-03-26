import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>Drunk Please 🥴</h1>
      <div className='links'>
          <ul>
        <Link to='/'>Home</Link>
        <Link to='/drinks'>Drinks</Link>
        <Link to='/add-drink'>Add Drink</Link>
        <Link to='/about'>About</Link>
        </ul>
      </div>
    </nav>
  );
};


export default Navbar;