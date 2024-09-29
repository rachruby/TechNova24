import React from 'react';
import maeveLogo from "./assets/maevelogo.png";
import {Link} from "react-router-dom";

function About() {
    return (
        <div className="bg-[url('./assets/empty.png')]
          w-screen h-screen bg-cover bg-center flex items-center text-white font-times italic">
            <div className="flex flex-row animate-fade-left">
                <div className="ml-32">
                    <img src={maeveLogo} className="w-108 max-w-full h-42 mt-2" alt="Maeve Logo"/>
                    <div className="text-2xl text-plat-blue">
                        ai-powered digital closet
                    </div>
                    <div className="text-4xl pink-button mt-8 mb-16 transition-transform duration-300 hover:scale-105">
                        <Link to="/" className="hover:text-plat-pink hover:glow">home</Link>
                    </div>
                </div>
                <div className="ml-20">
                    <p className="mt-4 text-2xl overflow-auto p-10">
                        maeve is your AI-powered virtual closet that uses an ai-powered, live camera feed to try clothes
                        on.
                        upload your clothes and use this digital fitting room!
                        <br/><br/>
                        1. keep track of your closet as you purchase new items.
                        <br/><br/>
                        2. try your clothes on with our live, ai-powered physique tracker.
                        <br/><br/>
                        3. mix and match to create new combos!
                        <br/><br/>
                        <span className="text-plat-blue">
                        made w love by gloria, halle, juna, n rachel for technova '24!
                            </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
