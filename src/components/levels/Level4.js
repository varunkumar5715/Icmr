
import React, { useState } from 'react';
import TextBox from '../controllers/Textbox';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';

const Level4 = ({ onNext, onPrev }) => {
    const options = [
        { "label": "letter", "value": "letter" },
        { "label": "word", "value": "word" },
        { "label": "sentence", "value": "sentence" }
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

 
    const getDropdownTitle = (ddTitle) => {
        return "ddTitle"; 
    };

    return (
        <div className="level1-container"> 

            <div className='name-component'>
                <h3>D1</h3>
                <Dropdown
                    options={options}
                    onSelect={handleDropdownSelect}
                    ddTitle={getDropdownTitle()} 
                />
            </div>

            <div className='name-component'>
                <h3>T1</h3>
                <TextBox
                    value={inputValue}
                    onChange={handleTextChange}
                />
            </div>

            <div className="button-container">
                <Button buttonName="Back" handleClick={onPrev} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>

        </div>
    );
};

export default Level4;
