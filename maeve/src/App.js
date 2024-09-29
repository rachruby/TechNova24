import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Closet from './Closet';
import About from './About';
import Navbar from './Navbar';
import UserInfo from './UserInfo';
import Try from "./Try"; // Import the Try component

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<UserInfo />} />
                    <Route path="/closet" element={<Closet />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/try" element={<Try />} /> {/* New route for VideoStream */}
                    {/* 404 Not Found Route */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
