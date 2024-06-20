
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './index.css'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { DataContextProvider } from './stores/DataContextProvider';
import Levels from './pages/Levels';
import Instruction from './pages/Instruction';


function App() {
  return (
    <DataContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/level" element={<Levels />} />
          <Route path="/instruction" element={<Instruction />} />
       
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;
