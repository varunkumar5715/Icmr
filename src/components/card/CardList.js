
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import './CardList.css';
import processDataFlow from '../../utils/DataController';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
  const { 
    m, sm, g, sk, level, levelCode, skillCode, 
    updateM, updateSM, updateG, updateSK, updateLevel, 
    updateLevelCode, updateSkillCode, updateFolderPath, folderPath 
  } = useContext(DataContext);
  const [cardList, setCardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (level < 4) {
      const data = processDataFlow(m, sm, g, sk);
      if (Array.isArray(data)) {
        setCardList(data);
      } else {
        console.error("processDataFlow did not return an array", data);
      }
    } else if (level === 4) {
      if (levelCode) {
        navigate('/level');
      }
    }
  }, [m, sm, g, sk, level, levelCode, skillCode, navigate]);

  const cardClick = (card) => {
    const { title, levelCode, skillCode, folderName } = card;
    let newFolderPath = folderPath ? folderPath : '/audiofiles';
    newFolderPath += `/${folderName}`;

   

    switch(level) {
      case 0:
        updateM(title);
        updateLevel(1);
        break;
      case 1:
        updateSM(title);
        updateLevel(2);
        break;
      case 2:
        updateG(title);
        updateLevel(3);
        break;
      case 3:
        updateSK(title);
        updateLevel(4);
        break;
      default:
        break;
    }

    updateLevelCode(levelCode);
    updateSkillCode(skillCode);
    updateFolderPath(newFolderPath);
  };

  return (
    <div className='cardlist'>
      {cardList.map((card, index) => (
        <Card key={index} title={card.title} levelCode={card.levelCode} skillCode={card.skillCode} handleClick={() => cardClick(card)} />
      ))}
    </div>
  );
};

export default CardList;
