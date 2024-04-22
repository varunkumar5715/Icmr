

// import React, { useState,useContext } from 'react';
// import Level1 from '../components/levels/Level1';
// import Level2 from '../components/levels/Level2';
// import Level3 from '../components/levels/Level3';
// import Level4 from '../components/levels/Level4';
// import Level5 from '../components/levels/Level5';
// import Level6 from '../components/levels/Level6';
// import DataContext from '../stores/DataContextProvider';
// import Layout from '../components/Layout/Layout';

// function Levels() {

//   const {levelCode, updateLevelCode} = useContext(DataContext);
//   console.log(levelCode)

//   const handleNextLevel = () => {
//     //instruction page
//   };

//   const handlePrevLevel = () => {
    
//   };

//   return (
//     <Layout>      
//       {levelCode === 1 && <Level1 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
//       {levelCode === 2 && <Level2 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
//       {levelCode === 3 && <Level3 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
//       {levelCode === 4 && <Level4 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
//       {levelCode === 5 && <Level5 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
//       {levelCode === 6 && <Level6 onPrev={handlePrevLevel} />}
//     </Layout>
//   );
// }

// export default Levels;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import DataContext from '../stores/DataContextProvider';
import Layout from '../components/Layout/Layout';
import Level1 from '../components/levels/Level1';
import Level2 from '../components/levels/Level2';
import Level3 from '../components/levels/Level3';
import Level4 from '../components/levels/Level4';
import Level5 from '../components/levels/Level5';
import Level6 from '../components/levels/Level6';

function Levels() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { levelCode, updateLevelCode } = useContext(DataContext);

  const handleNextLevel = () => {
    if (levelCode) {
      navigate('/instruction'); // Navigate to the instruction page
    } else {
      console.log("Level code is not available");
      // Handle the case where level code is not available
    }
  };

  const handlePrevLevel = () => {
    //instruction page
  };

  return (
    <Layout>      
      {levelCode === 1 && <Level1 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 2 && <Level2 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 3 && <Level3 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 4 && <Level4 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 5 && <Level5 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 6 && <Level6 onPrev={handlePrevLevel} />}
    </Layout>
  );
}

export default Levels;
