import React, { useContext, useEffect, useState, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';
import './TestScreen7.css';

const TestScreen10 = () => {
  const {
    sk,
    g,
    playedScripts,
    updatePlayedScripts,
    memoryScoreCount,
    updateMemoryScoreCount,
    sequenceScoreCount,
    updateSequenceScoreCount,
    totalSetsPlayed,
    updateTotalSetsPlayed,
  } = useContext(DataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedScripts, setSelectedScripts] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [buttonColors, setButtonColors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [responseOrder, setResponseOrder] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();
  const timeoutRef = useRef(null); // Ref to store timeout ID

  useEffect(() => {
    if (!isExiting) { // Only initialize if not exiting
      setSelectedScripts(playedScripts);
      setUserResponses(Array(playedScripts.length).fill(''));
      setButtonColors(Array(playedScripts.length).fill('default'));
    }
  }, [playedScripts, isExiting]);

  const handleResponseClick = (index) => {
    if (isExiting) return; // Prevent actions if exiting

    const newColors = [...buttonColors];
    const newResponses = [...userResponses];
    let newResponseOrder = [...responseOrder];

    if (isEditing) {
      newColors[index] = 'green';
      newResponses[index] = selectedScripts[index];
    } else {
      if (newColors[index] === 'default') {
        newColors[index] = 'green';
        newResponses[index] = selectedScripts[index];
        newResponseOrder.push(selectedScripts[index]);
      } else {
        newColors[index] = 'default';
        newResponses[index] = '';
        // Remove the response from the order
        newResponseOrder = newResponseOrder.filter(
          (item) => item !== selectedScripts[index]
        );
      }
    }

    setButtonColors(newColors);
    setUserResponses(newResponses);
    setResponseOrder(newResponseOrder);

    // Check sequence after each click
    const sequenceScore = checkSequence(newResponseOrder);
    console.log('Current Response Order:', newResponseOrder);
    console.log('Sequence Score:', sequenceScore);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (isExiting) return;

    setIsEditing(true);
    setButtonColors(Array(selectedScripts.length).fill('default'));
    setUserResponses(Array(selectedScripts.length).fill(''));
    setResponseOrder([]); // Reset the response order
  };

  const checkSequence = (currentResponseOrder) => {
    // Check if the current response order matches the order of selectedScripts
    if (currentResponseOrder.length !== selectedScripts.length) {
      return 0;
    }
    return currentResponseOrder.every(
      (response, index) => response === selectedScripts[index]
    )
      ? 1
      : 0;
  };

  const calculateScores = () => {
    let memoryCount = 0;
    let sequenceCount = 0;

    // Check if all responses are provided
    const allResponsesProvided = userResponses.filter(Boolean).length === selectedScripts.length;

    if (allResponsesProvided) {
      // Check if all responses are correct, regardless of order
      const allCorrect = selectedScripts.every((script) =>
        userResponses.includes(script)
      );

      if (allCorrect) {
        memoryCount = 1;
      }

      // Check if the responses are in the correct sequence
      sequenceCount = checkSequence(responseOrder);
    } else {
      // If not all responses are provided, both scores are 0
      memoryCount = 0;
      sequenceCount = 0;
    }

    console.log(
      `Final Scores - Memory Count: ${memoryCount}, Sequence Count: ${sequenceCount}`
    );

    return { memoryCount, sequenceCount };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isExiting) return;

    const { memoryCount, sequenceCount } = calculateScores();

    updateMemoryScoreCount((prev) => prev + memoryCount);
    updateSequenceScoreCount((prev) => prev + sequenceCount);

    console.log('Updated Memory Score Count:', memoryScoreCount + memoryCount);
    console.log(
      'Updated Sequence Score Count:',
      sequenceScoreCount + sequenceCount
    );

    updateTotalSetsPlayed(totalSetsPlayed + 1);
    console.log('Total Sets Played:', totalSetsPlayed + 1);

    updatePlayedScripts(userResponses);

    // Set a timeout to navigate to the next test screen
    timeoutRef.current = setTimeout(() => {
      if (!isExiting) {
        setButtonColors(Array(selectedScripts.length).fill('default'));
        setSelectedScripts([]);
        navigate('/testScreen8');
      }
    },500);
  };

  const handleExit = (e) => {
    e.preventDefault();
    if (isExiting) return;
    console.log('Exit button clicked.');
    setIsExiting(true); // Stop any further actions
    setShowPopup(true); // Show the popup

    // Clear any ongoing timeouts or intervals
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Reset any states if necessary
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home'); // Navigate to home after manually closing the popup
  };

  const memoryScore = `${memoryScoreCount}/${totalSetsPlayed}`;
  const sequenceScore = `${sequenceScoreCount}/${totalSetsPlayed}`;

  return (
    <div className="test-screen7">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        
        <h3>Recall and repeat back in the same order</h3>
        <div className="scripts-display">
          <ul>
            {selectedScripts.length > 0 ? (
              selectedScripts.map((script, index) => (
                <li key={index}>
                  <button
                    className={`response-btn ${buttonColors[index]}`}
                    onClick={() => handleResponseClick(index)}
                  >
                    {userResponses[index] || script}
                  </button>
                </li>
              ))
            ) : (
              <li>No played scripts available.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="control-buttons">
        <button className="control-btn edit-btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="control-btn submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="control-btn exit-btn" onClick={handleExit}>
          Exit
        </button>
      </div>

      {showPopup && (
        <Popup
          memoryScore={memoryScore}
          sequencingScore={sequenceScore}
          onClose={handleClosePopup}
          isTestScreen7={true} // or false, depending on the screen
        />
      )}
    </div>
  );
};

export default TestScreen10;


