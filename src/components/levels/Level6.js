

import React, { useState } from 'react';
import TextBox from '../controllers/Textbox';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';

const Level1 = ({ onNext, onPrev }) => {
    const options = [
        { "label": "letter", "value": "letter" },
        { "label": "word", "value": "word" },
        { "label": "sentence", "value": "sentence" }
    ]

    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    // Define a function to return the dropdown title
    const getDropdownTitle = (ddTitle) => {
        return "ddTitle"; // Replace with your logic to get the dropdown title
    };

    return (
        <div className="level1-container"> {/* Apply background class here */}
          <div className='name-component'>
                <h3>d</h3>
                <TextBox
                    value={inputValue}
                    onChange={handleTextChange}
                />
            </div>
            <div className='name-component'>
                <h3>c</h3>
                <TextBox
                    value={inputValue}
                    onChange={handleTextChange}
                />
            </div>

            <div className='name-component'>
                <h3>b</h3>
                <Dropdown
                    options={options}
                    onSelect={handleDropdownSelect}
                    ddTitle={getDropdownTitle()} // Pass the dropdown title
                />
            </div>
            <div className='name-component'>
                <h3>a</h3>
                <Dropdown
                    options={options}
                    onSelect={handleDropdownSelect}
                    ddTitle={getDropdownTitle()} // Pass the dropdown title
                />
            </div>

          

            <div className="button-container">
                <Button buttonName="Back" handleClick={onPrev} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>

        </div>
    );
};

export default Level1;
