// // src/pages/TestPage.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import TestScreen1 from '../components/Testpage/TestScreen1';
// import Layout from '../components/Layout/Layout';
// import TestScreen3 from '../components/Testpage/TestScreen3';
// import TestScreen2 from '../components/Testpage/TestScreen2';


// const TestPage = () => {
//   return (
//     <Layout>
//      <div>
//       <Routes>
//         <Route path="/" element={<TestScreen1/>} /> 
//       </Routes>
//      </div>
//     </Layout>
//   );
// };

// export default TestPage;

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import TestScreen1 from '../components/Testpage/TestScreen1';
import TestScreen2 from '../components/Testpage/TestScreen2';
import TestScreen3 from '../components/Testpage/TestScreen3';
import Layout from '../components/Layout/Layout';
import DataContext from '../stores/DataContextProvider';

const TestPage = () => {
  const { testCode } = useContext(DataContext);

  const getTestScreen = () => {
    switch (testCode) {
      case 1:
        return <TestScreen1 />;
      case 2:
        return <TestScreen2 />;
      case 3:
        return <TestScreen3 />;
      default:
        return <TestScreen1 />; // Default to TestScreen1 if no valid testCode
    }
  };

  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/" element={getTestScreen()} />
        </Routes>
      </div>
    </Layout>
  );
};

export default TestPage;


