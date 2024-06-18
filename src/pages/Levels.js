import React, { useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../stores/DataContextProvider';
import Layout from '../components/Layout/Layout';

const levelComponents = {
  1: React.lazy(() => import('../components/levels/Level1')),
  2: React.lazy(() => import('../components/levels/Level2')),
  3: React.lazy(() => import('../components/levels/Level3')),
  4: React.lazy(() => import('../components/levels/Level4')),
  5: React.lazy(() => import('../components/levels/Level5')),
  6: React.lazy(() => import('../components/levels/Level6')),
  7: React.lazy(() => import('../components/levels/Level7')),
};

function Levels() {
  const navigate = useNavigate();
  const { levelCode, skillCode, levels } = useContext(DataContext);

  console.log("Levels variable:", levels);
  console.log("Current Level Code:", levelCode);
  console.log("Current Skill Code:", skillCode);

  const handleNextLevel = () => {
    navigate('/instruction');
  };

  const handlePrevLevel = () => {
    navigate('/home');
  };

  const LevelComponent = levelComponents[levelCode];

  const getLabelAndOptions = (levels, skillCode) => {
    for (const level of levels) {
      console.log("Checking level:", level);
      if (level.skill && Array.isArray(level.skill)) {
        for (const skill of level.skill) {
          console.log("Checking skill:", skill);
          if (skill.skillCode === skillCode) {
            let data = [];
            if (Array.isArray(skill.dropdown)) {
              data = data.concat(skill.dropdown.map(dropdown => ({ label: dropdown.label, options: dropdown.options, type: 'dropdown' })));
            }
            if (Array.isArray(skill.textbox)) {
              data = data.concat(skill.textbox.map(textbox => ({ label: textbox.label, placeholder: textbox.placeholder, type: 'text' })));
            }
            return data;
          }
        }
      }
    }
    return null; // Skill code not found
  };

  const skillData = getLabelAndOptions(levels, skillCode);

  console.log("Skill Data:", skillData);

  if (!LevelComponent ||  !skillData) {
    return <div>Invalid level or skill</div>;
  }

  const levelData = {
    levelCode: levelCode,
    skillData: skillData
  };

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <LevelComponent
          levelData={levelData}
          onNext={handleNextLevel}
          onBack={handlePrevLevel}
        />
      </Suspense>
    </Layout>
  );
}

export default Levels;


