


import React, { useState } from 'react';

import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
// Import the Card component
import './Level.css';

const Level5 = ({onNext, onPrev}) => {
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };



    return (
        <div className="level1-container">
            <div className='name-component'>
                <h3>D1</h3>
                <Dropdown
                    options={options}
                    onSelect={handleDropdownSelect}
                />
            </div>
            <div className='name-component'>
                <h3>D2</h3>
                <Dropdown
                    options={options}
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