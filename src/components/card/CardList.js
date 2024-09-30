

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

  const baseDirectory = '/ICMR-MAIN/backend/audiofiles'; // Use forward slashes for paths

  useEffect(() => {
    // Default to '/instruction' if level is undefined or out of range
    if (level === undefined || level < 0 || level > 4) {
      navigate('/instruction');
      return;
    }

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
      } else {
        navigate('/instruction');
      }
    }
  }, [m, sm, g, sk, level, levelCode, skillCode, navigate]);

  const cardClick = (card) => {
    const { title, levelCode, skillCode, folderName } = card;
    let newFolderPath = folderPath ? folderPath : baseDirectory; // Start with base directory
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
        navigate('/instruction');
        return;
    }

    updateLevelCode(levelCode);
    updateSkillCode(skillCode);
    updateFolderPath(newFolderPath);
  };

  return (
    <div className='cardlist'>
      {cardList.length > 0 ? (
        cardList.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            levelCode={card.levelCode} 
            skillCode={card.skillCode} 
            handleClick={() => cardClick(card)} 
          />
        ))
      ) : (
        <p>No cards available.</p>
      )}
    </div>
  );
};

export default CardList;
