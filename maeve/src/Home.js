import React from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';
import clothes from './assets/clothes.png';
import maeveLogo from './assets/maevelogo.png';


function Home() {
  return (
      <div>
          <div className="bg-[url('./assets/clothes.png')]
          w-screen h-screen bg-cover bg-center flex justify-end items-center text-white">
              <div className="flex flex-col">
                  <img src={maeveLogo} className="animate-fade-left w-96 h-auto mr-32 -mt-32"/>
              <Navbar/>
              </div>
          </div>
      </div>


  );
}

export default Home;