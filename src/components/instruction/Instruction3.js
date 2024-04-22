
import React from 'react';
import './Instruction.css';
import Button from '../controllers/Button';

const Instruction3 = ({ onNext,onBack }) => {
    return (
        <div className="instruction-container">
            <h1>Instruction 3</h1>
            <p>This is your third instruction</p>
            <p>Another instruction for step 3</p>
            <p>Yet another instruction for step 3</p>
            <div className="button-container">
                <Button buttonName="Back" handleClick={onBack} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>
        </div>
    );
};

export default Instruction3;
