import React from 'react';
import './Popup.css'; // Ensure the styles are defined in Popup.css

const Popup = ({ score, totalAudioPlayed, memoryScore, sequencingScore, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Results</h2>
        <p className="popup-score">
          <span className="correct-answers">{score}</span> / {totalAudioPlayed}
        </p>
        <p className="popup-text">You answered {score} out of {totalAudioPlayed} correctly!</p>
        
        {/* Display memory and sequencing scores */}
        <div className="popup-scores">
          <p className="memory-score">Memory Score: {memoryScore}</p>
          <p className="sequencing-score">Sequencing Score: {sequencingScore}</p>
        </div>

        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
