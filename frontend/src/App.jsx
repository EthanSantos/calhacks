import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/home/Home';
import UserInput from './pages/input/UserInput';
import Navbar from './navbar/Navbar';

function App() {
  const [contractData, setContractData] = useState();

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-input" element={<UserInput setContractData = {setContractData}/>} />
        </Routes>
    </Router>
  );
}

export default App;
