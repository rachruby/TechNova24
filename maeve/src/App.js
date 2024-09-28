import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Define routes with path and component */}
            <Route path="/" element={<Home />} />
            {/*<Route path="/about" element={<About />} />
            {/* 404 Not Found Route */}
            {/*<Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    );
}

export default App;