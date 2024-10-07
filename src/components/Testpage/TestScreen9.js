import React, { useContext, useEffect } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import './TestScreen9.css';

const TestScreen9 = () => {
  const {
    playedScripts,
    updatePlayedScripts,
    currentFileName,
    instruction,
    totalAudioFiles,
    currentFileCount,
    updateCurrentFileCount
  } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current File Name:", currentFileName);
    console.log("Played Scripts:", playedScripts);
    console.log("Total Audio Files:", totalAudioFiles);
    console.log("Current File Count:", currentFileCount);

    if (totalAudioFiles === undefined) {
      console.error("totalAudioFiles is undefined. Redirecting to home.");
      navigate('/home');
    }

    if (currentFileCount === undefined || currentFileCount === 0) {
      updateCurrentFileCount(1);
    }
  }, [totalAudioFiles, currentFileCount, navigate, updateCurrentFileCount, currentFileName, playedScripts]);

  const handleResponse = (isCorrect) => {
    console.log("Response received. Is Correct:", isCorrect);
    console.log("Current File:", currentFileName);

    if (isCorrect) {
      updatePlayedScripts((prev) => [...prev, { fileName: currentFileName, isCorrect }]);
    }

    // Update the current file count
    updateCurrentFileCount(currentFileCount + 1);

    // Check if we have reached the total audio files
    if (currentFileCount >= totalAudioFiles) {
      // Clear the current file count before navigating to testScreen10
      updateCurrentFileCount(0); // Reset to zero or any desired value
      navigate('/testscreen10');
    } else {
      navigate('/testscreen8');
    }
  };

  return (
    <div className="test-screen9">
      <h2>{instruction[0]}</h2> {/* Display only the first line of the instruction */}
      <h3>{currentFileName}</h3>
      <div className="button-row">
        <button className="correct" onClick={() => handleResponse(true)}>Correct</button>
        <button className="incorrect" onClick={() => handleResponse(true)}>Incorrect</button>
      </div>
      <div className="button-row">
        <button className="exit" onClick={() => navigate('/home')}>Exit</button>
      </div>
    </div>
  );
};

export default TestScreen9;
