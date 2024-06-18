import React from 'react';
import './Instruction.css';
import Button from '../controllers/Button';

const Instruction1 = ({ instructionData, onBack, onNext }) => {
    return (
        <div className="instruction-container">
            <h1>{instructionData.title}</h1>

            {instructionData.levelTitle && (
                <ul>
                    {instructionData.levelTitle.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            )}

            {instructionData.instruction && (
                <div>
                    <h2>Instructions:</h2>
                    <p>{instructionData.instruction}</p>
                </div>
            )}

            {instructionData.example && (
                <div>
                    <h2>Example:</h2>
                    <p>{instructionData.example}</p>
                </div>
            )}

            <div className="button-container">
                <Button buttonName="Back" handleClick={onBack} />
                <Button buttonName="Next" handleClick={onNext} />
            </div>
        </div>
    );
};

export default Instruction1;
