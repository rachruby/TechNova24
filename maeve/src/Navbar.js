import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <nav>
            <ul className="animate-fade-left animate-delay-300 animate-duration-1000

            italic font-times text-4xl text-plat-white text-opacity-80 space-y-12">
                {/* Glow effect on hover with transition */}
                <li className="pink-button mt-24 mb-16 transition-transform duration-300 hover:scale-105">
                    <Link to="/auth" className="hover:text-plat-pink hover:glow">visit your closet</Link>
                </li>

                <li className="blue-button my-16 mb-24 transition-transform duration-300 hover:scale-105">
                    <Link to="/about" className="hover:text-plat-blue hover:glow">about maeve</Link>
                </li>

                <li className="text-2xl text-plat-blue">
                    ai-powered digital closet
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;