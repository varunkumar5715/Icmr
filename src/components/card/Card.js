
import React from 'react';
import './Card.css';

function Card({ title, handleClick, levelCode, skillCode }) {
    console.log("card - LevelCode", levelCode)
    const handleCardClick = (e) => {
        e.preventDefault()
        handleClick({ title, levelCode, skillCode});
    };

    return (
        <div className='card-container'>
            <div className='card' onClick={handleCardClick}>
                <div className='card-content'>
                    <h2>{title} </h2>
                </div>
            </div>
        </div>
    );
}

export default Card;

