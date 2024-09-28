import React from 'react';
import { Link } from 'react-router-dom';
import homeBg from './assets/homebg.png';
import maeveLogo from './assets/maevelogo.png';


function Home() {
  return (
    <div class="w-screen h-screen bg-cover bg-center flex justify-center items-center text-white"
    style={{ backgroundImage: `url(${homeBg})` }}>
      <Link to="/Closet">
      <img 
          src={maeveLogo} 
          alt="Clickable" 
          class="w-64 h-auto cursor-pointer"
        />
      </Link>
    </div>
  );
}

export default Home;