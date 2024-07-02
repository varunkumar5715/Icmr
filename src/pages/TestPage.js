// src/pages/TestPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TestScreen1 from '../components/Testpage/TestScreen1';
import Layout from '../components/Layout/Layout';

const TestPage = () => {
  return (
    <Layout>
    <div>
      <Routes>
        <Route path="/" element={<TestScreen1 />} /> {/* Directly render TestScreen1 */}
      </Routes>
    </div>
    </Layout>
  );
};

export default TestPage;



