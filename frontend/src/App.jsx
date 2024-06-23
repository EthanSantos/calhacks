import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/home/Home';
import UserInput from './pages/input/UserInput';
import Navbar from './navbar/Navbar';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-input" element={<UserInput />} />
        </Routes>
    </Router>
  );
}

export default App;