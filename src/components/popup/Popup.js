import React from 'react';
import './Popup.css'; // Ensure the styles are defined in Popup.css

const Popup = ({ 
  score, 
  totalAudioPlayed, 
  memoryScore, 
  sequencingScore, 
  onClose, 
  isTestScreen7, 
  isTestScreen10 
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Results</h2>

        {/* Conditional rendering based on the test screen type */}
        {(isTestScreen7 || isTestScreen10) ? (
          // For TestScreen7 and TestScreen10, show memory and sequencing scores
          <div className="popup-scores">
            <p className="memory-score">Memory Score: {memoryScore}</p>
            <p className="sequencing-score">Sequencing Score: {sequencingScore}</p>
          </div>
        ) : (
          // For other test screens, show the score and total audio played
          <>
            <p className="popup-score">
              <span className="correct-answers">{score}</span> / {totalAudioPlayed}
            </p>
            <p className="popup-text">You answered {score} out of {totalAudioPlayed} correctly!</p>
          </>
        )}

        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
