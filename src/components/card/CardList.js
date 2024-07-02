

import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import './CardList.css';
import processDataFlow, { getLevelTitle } from '../../utils/DataController';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom'; 

const CardList = () => {
    const { m, sm, g, sk, level, levelCode, skillCode,  updateM, updateSM, updateG, updateSK, updateLevel, updateLevelCode, updateSkillCode} = useContext(DataContext);
    const [cardList, setCardList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("card", m,sm,g,sk,level, cardList)  
        if(level<4)
        {
          
            const data =processDataFlow(m, sm, g, sk)  
            console.log("data:",data)
            if (Array.isArray(data)) {          
            setCardList(data);
        } else {
            console.error("processDataFlow did not return an array", data);
        }
            console.log(sk)
        }
      
        else if (level==4) 
            {           
                console.log("levelCode", levelCode, "skillCode", skillCode)    
                if (levelCode) {
                    console.log(' Redirecting to levelcode')
                    navigate('/level'); 
                } else {
                    console.log("levelCode is not available");
                }
            }  
        

    }, [m, sm, g, sk, level]);

    const cardClick = (card) => {       
        console.log("cardClicked", card, level)
       
            const { title, levelCode, skillCode } = card;
            updateLevelCode(levelCode)
            updateSkillCode(skillCode)

            if (level == 0) {
                updateM(title);
                updateLevel(1)
               
            }
            else if (level == 1) {
                updateSM(title);
                updateLevel(2)
            }
            else if (level == 2) {
                updateG(title);
                updateLevel(3)
            }
            else if (level == 3) {
                updateSK(title);
                updateLevel(4)
            }
        
    };

    return (
        <div className='cardlist'>
            {cardList.map((card, index) => (
                <Card key={index} title={card.title} levelCode = {card.levelCode} skillCode = {card.skillCode} handleClick={cardClick} />
            ))}
        </div>
    );
};

export default CardList;
