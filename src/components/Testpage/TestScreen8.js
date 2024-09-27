import React, { useContext, useEffect, useState, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import './TestScreen6.css';

const TestScreen8 = () => {
  const { selectedOptions } = useContext(DataContext);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const audioRef = useRef(new Audio());
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const navigate = useNavigate();
  
  // Example question, you can modify this based on your logic or requirements
  const questionText = "Is this the correct audio file?"; 

  // Update audio file names and preload the first audio if needed
  useEffect(() => {
    // Assuming selectedOptions is an array of file names
    setSelectedFileNames(selectedOptions);
    if (selectedOptions.length > 0) {
      audioRef.current.src = selectedOptions[0]; // Load the first audio file
    }
  }, [selectedOptions]);

  const handleCorrect = () => {
    // Logic for correct answer
    alert('Correct!');
    // Optionally navigate or perform additional actions
  };

  const handleIncorrect = () => {
    // Logic for incorrect answer
    alert('Incorrect!');
    // Optionally navigate or perform additional actions
  };

  return (
    <div className="test-screen6">
      <div className="header">
        <h2>{questionText}</h2>
      </div>
      <div className="content">
        <h2 className="display-script">{selectedFileNames[currentAudioIndex] || 'Loading...'}</h2>
      </div>
      <div className="button-row">
        <button className="button correct" onClick={handleCorrect}>Correct</button>
        <button className="button incorrect" onClick={handleIncorrect}>Incorrect</button>
        <button className="button exit" onClick={() => navigate('/home')}>Exit</button>
      </div>
    </div>
  );
};

export default TestScreen8;