import React from 'react';
import './TestScreen3.css';
import { useState, useContext } from 'react';
import DataContext from '../../stores/DataContextProvider';

const TestScreen3 = () => {
    const { sk, g, instruction } = useContext(DataContext);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        setIsPlaying(true);
        // Implement your audio play logic here
    };
    const handleCorrectClick = () => {
        console.log('Correct button clicked');
    };

    const handleIncorrectClick = () => {
        console.log('Incorrect button clicked');
    };

    const handleRepeatClick = () => {
        console.log('Repeat button clicked');
    };

    const handleExitClick = () => {
        console.log('Exit button clicked');
    };
    return (
        <div className="test-screen">
            <div className="header">
                <span>{g}</span>
                <span className="skill">{sk}</span>
            </div>
            <div className="content">
                <h2>{instruction}</h2>
                <div className="audio-container" onClick={playAudio}>
                    <span className="audio-icon">&#128266;</span>
                    <div className="script-container">
                      
                        <h2 className="script">script 0</h2>
                        <p>words 1</p>
                        <p>words 2</p>
                        <p>words 3</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="correct-button" onClick={handleCorrectClick}>Correct</button>
                <button className="incorrect-button" onClick={handleIncorrectClick}>Incorrect</button>
                <button className="repeat-button" onClick={handleRepeatClick}>Repeat</button>
                <button className="exit-button" onClick={handleExitClick}>Exit</button>
            </div>
        </div>
    );
};

export default TestScreen3;
