

import React, { useEffect, useState , useContext} from 'react';
import TextBox from '../controllers/Textbox';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import './Level.css';
import processDataFlow from '../../utils/DataController';
import DataContext from '../../stores/DataContextProvider';
import {getLevelTitle} from '../../utils/DataController'

const Level1 = ({ onNext, onPrev }) => {
    const { m, sm, g, sk, level} = useContext(DataContext);
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

    // Define a function to return the dropdown title
    useEffect(()=>{       
        // const titleArray = processDataFlow(m, sm, g, sk)
        // console.log(titleArray)        
    }, [])
    

    return (
        <div className="level1-container"> {/* Apply background class here */}

            <div className='name-component'>
                <h3>d1</h3>
                <Dropdown
                    options={options}
                    onSelect={handleDropdownSelect}
                    ddTitle="Hello" // Pass the dropdown title
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
