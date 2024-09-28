import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Closet from './Closet';
import Navbar from './Navbar';

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            {/* Define routes with path and component */}
            <Route path="/" element={<Home />} />
            <Route path="/Closet" element={<Closet />} />
            {/* 404 Not Found Route */}
            {/*<Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    );
}

export default App;
