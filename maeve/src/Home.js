import React from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';
import clothes from './assets/clothes.png';
import maeveLogo from './assets/maevelogo.png';


function Home() {
  return (
    <div className="w-screen h-screen bg-cover bg-center flex justify-center items-center text-white"
    style={{ backgroundImage: `url(${homeBg})` }}>
      <Link to="/Closet">
      <img 
          src={maeveLogo} 
          alt="Clickable" 
          className="w-64 h-auto cursor-pointer"
        />
      </Link>
    </div>
  );
}

export default Home;