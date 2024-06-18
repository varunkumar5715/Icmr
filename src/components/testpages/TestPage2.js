
import React, { useState } from 'react';
import './TestPage.css';
import Button from '../components/controllers/Button';


const TestPage2 = ({ onNext, onPrev,onExit,onclick, onCorrect, onIncorrect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="custom-card">
            <div className="skill">Skill</div>
            <div className="goals">Goals and Levels</div>
            <div className="instruction">Instruction</div>
            <div className="card-content">

                <div className="centered-container">
                    <div className="white-container">
                        <div className="audio-symbol">🔊</div>
                        <Button buttonName="click" handleClick={onclick} />
                    </div>
                </div>

                <div className="button-line">
                    <Button buttonName="Exit" handleClick={onExit} />
                  
                </div>
        

            </div>
        </div>
    );
};

export default TestPage2;