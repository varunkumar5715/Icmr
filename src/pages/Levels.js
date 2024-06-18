import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../stores/DataContextProvider';
import Layout from '../components/Layout/Layout';
import Level1 from '../components/levels/Level1';
import Level2 from '../components/levels/Level2';
import Level3 from '../components/levels/Level3';
import Level4 from '../components/levels/Level4';
import Level5 from '../components/levels/Level5';
import Level6 from '../components/levels/Level6';
import Level7 from '../components/levels/Level7';

function Levels() {
  const navigate = useNavigate();
  const { levelCode } = useContext(DataContext);

  const handleNextLevel = () => {
    navigate('/instruction');
  };

  const handlePrevLevel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Layout>
      {levelCode === 1 && <Level1 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 2 && <Level2 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 3 && <Level3 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 4 && <Level4 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 5 && <Level5 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 6 && <Level6 onNext={handleNextLevel} onPrev={handlePrevLevel} />}
      {levelCode === 7 && <Level7 onPrev={handlePrevLevel} />}
    </Layout>
  );
}

export default Levels;
