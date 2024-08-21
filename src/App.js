

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { DataContextProvider } from './stores/DataContextProvider';
import Levels from './pages/Levels';
import Instruction from './pages/Instruction';
import TestPage from './pages/TestPage';

function App() {
  return (
    <DataContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/level" element={<Levels />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/testscreen/*" element={<TestPage />} />
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;

