// import React from 'react';
// import styles from './Popup.css';

// const Popup = ({ message, onClose }) => {
//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <h2>Score</h2>
//         <p>{message}</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Popup;

import React from 'react';
import './Popup.css'; // Using the styles defined below

const Popup = ({ score, totalAudioPlayed, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Results</h2>
        <p className="popup-score">
          <span className="correct-answers">{score}</span> / {totalAudioPlayed}
        </p>
        <p className="popup-text">You answered {score} out of {totalAudioPlayed} correctly!</p>
        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
