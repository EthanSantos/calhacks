import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/home/Home';
import UserInput from './pages/input/UserInput';
import Navbar from './navbar/Navbar';
import Translate from './pages/translate/Translate';

function App() {
  const [contractData, setContractData] = useState();

  return (
    <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-input" element={<UserInput setContractData = {setContractData}/>} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
    </Router>
  );
}

export default App;