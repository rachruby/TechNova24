import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Closet from './Closet';
import Navbar from './Navbar';
import UserInfo from './UserInfo'; // Import the UserInfo component

function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <UserInfo /> {/* Include the UserInfo component here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Closet" element={<Closet />} />
            {/* 404 Not Found Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    );
}

export default App;
