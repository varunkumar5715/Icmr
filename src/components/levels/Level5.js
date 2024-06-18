


import React, { useState } from 'react';

import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
// Import the Card component
import './Level.css';

const Level5 = ({onNext, onPrev}) => {
    const options1 = [
        { "label": "letter", "value": "letter" },
        { "label": "word", "value": "word" },
        { "label": "sentence", "value": "sentence" }
    ];

    const options2 = [
        { "label": "up", "value": "letter" },
        { "label": "down", "value": "word" },
        { "label": "left", "value": "sentence" },
        { "label": "Right", "value": "sentence" }
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const label1 = "Stimulus";
    const label2 = "Type";

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };



    return (
        <div className="level1-container">
            <div className='name-component'>
                <h3>{label1}</h3>
                <Dropdown
                    options={options1}
                    onSelect={handleDropdownSelect}
                />
            </div>
            <div className='name-component'>
                <h3>{label2}</h3>
                <Dropdown
                    options={options2}
                    onSelect={handleDropdownSelect}
                />
            </div>
            <div className="button-container">
                <Button buttonName="Back" handleClick={onPrev} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>


        </div>
    );
};

export default Level5;