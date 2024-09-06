

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
// import { DataContextProvider } from './stores/DataContextProvider';
// import Levels from './pages/Levels';
// import Instruction from './pages/Instruction';
// import TestPage from './pages/TestPage';

// function App() {
//   return (
//     <DataContextProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/level" element={<Levels />} />
//           <Route path="/instruction" element={<Instruction />} />
//           <Route path="/testscreen" element={<TestPage />} />
//         </Routes>
//       </Router>
//     </DataContextProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Levels from './pages/Levels';
import Instruction from './pages/Instruction';
import TestPage from './pages/TestPage'; // Ensure this file is imported
import Layout from './components/Layout/Layout'; // Import the Layout component
import TestScreen1 from './components/Testpage/TestScreen1';
import TestScreen2 from './components/Testpage/TestScreen2';
import TestScreen3 from './components/Testpage/TestScreen3';
import { DataContextProvider } from './stores/DataContextProvider';

function App() {
  return (
    <DataContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/level" element={<Levels />} />
            <Route path="/instruction" element={<Instruction />} />
            <Route path="/testscreen1" element={<TestScreen1 />} />
            <Route path="/testscreen2" element={<TestScreen2 />} />
            <Route path="/testscreen3" element={<TestScreen3 />} />
          </Routes>
        </Layout>
      </Router>
    </DataContextProvider>
  );
}

export default App;
