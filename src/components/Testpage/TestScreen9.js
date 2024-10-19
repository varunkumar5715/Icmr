import React, { useContext, useEffect, useState, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import './TestScreen9.css';
import Popup from '../popup/Popup';

const TestScreen9 = () => {
  const {
   
    updatePlayedScripts,
    currentFileName,
    instruction,
    totalAudioFiles,
    currentFileCount,
    updateCurrentFileCount,
    memoryScoreCount,
    sequenceScoreCount,
    totalSetsPlayed,
    distractionScoreCount,
    updateDistractionScoreCount,
  } = useContext(DataContext);

  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (totalAudioFiles === undefined) {
      navigate('/home');
    }

    if (currentFileCount === undefined || currentFileCount === 0) {
      updateCurrentFileCount(1);
    }
  }, [totalAudioFiles, currentFileCount, navigate, updateCurrentFileCount]);

  const handleResponse = (isCorrect) => {
    if (isCorrect) {
      updatePlayedScripts((prev) => [...prev, { fileName: currentFileName, isCorrect }]);
      updateDistractionScoreCount(distractionScoreCount + 1); // Increment the distraction score when "Correct" is clicked
    }

    updateCurrentFileCount(currentFileCount + 1);

    if (currentFileCount >= totalAudioFiles) {
      updateCurrentFileCount(0);
      navigate('/testscreen10');
    } else {
      navigate('/testscreen8');   
    }
  };

  const memoryScore = `${memoryScoreCount}/${totalSetsPlayed}`;
  const sequenceScore = `${sequenceScoreCount}/${totalSetsPlayed}`;
  const distractionRawScore = `${distractionScoreCount}/${totalAudioFiles*totalSetsPlayed}`;
  const distractionScore = `${distractionScoreCount}/${totalSetsPlayed}`;

  const handleExit = (e) => {
    e.preventDefault();
    if (isExiting) return;
    setIsExiting(true);
    setShowPopup(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home');
  };

  return (
    <div className="test-screen9">
      <h2>{instruction[1]}</h2>
      <h3>{currentFileName}</h3>
      <div className="button-row">
        <button className="correct" onClick={() => handleResponse(true)}>Correct</button>
        <button className="incorrect" onClick={() => handleResponse(false)}>Incorrect</button>
      </div>
      <div className="button-row">
        <button className="exit" onClick={handleExit}>Exit</button>
      </div>
      {showPopup && (
        <Popup
          memoryScore={memoryScore}
          sequencingScore={sequenceScore}
          distractionRawScore={distractionRawScore}
          distractionScore={distractionScore}
          onClose={handleClosePopup}
          isTestScreen9={true}
        />
      )}
    </div>
  );
};

export default TestScreen9;
