// Instruction2.js
import React from 'react';
import './Instruction.css';
import Button from '../controllers/Button';

const Instruction2 = ({onNext ,onBack }) => {
    return (
        <div className="instruction-container">
            <h1>Instruction 2</h1>
            <p> This is your second instruction.</p>
            <p>Another instruction for step 2.</p>
            <div className="button-container">
                <Button buttonName="Back" handleClick={onBack} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>
        </div>
    );
};

export default Instruction2;
