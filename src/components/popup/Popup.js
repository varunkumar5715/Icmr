// import React from 'react';
// import './Popup.css';

// const Popup = ({
//   score,
//   totalAudioPlayed,
//   memoryScore,
//   sequencingScore,
//   distractionRawScore,
//   onClose,
//   isTestScreen6,
//   isTestScreen7,
//   isTestScreen8,
//   isTestScreen9,
//   isTestScreen10,
// }) => {
//   const isMemoryAndSequencingScreen = isTestScreen6 || isTestScreen7 || isTestScreen8 || isTestScreen9 || isTestScreen10;

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container">
//         <h2 className="popup-title">Results</h2>

//         {isMemoryAndSequencingScreen ? (
//           <div className="popup-scores">
//             <p className="memory-score">Memory Score: {memoryScore}</p>
//             <p className="sequencing-score">Sequencing Score: {sequencingScore}</p>
//             {isTestScreen8 || isTestScreen9 || isTestScreen10 ? (
//               <p className="distraction-score">Distraction Raw Score: {distractionRawScore}</p>
//             ) : null}
//           </div>
//         ) : (
//           <>
//             <p className="popup-score">
//               <span className="correct-answers">{score}</span> / {totalAudioPlayed}
//             </p>
//             <p className="popup-text">You answered {score} out of {totalAudioPlayed} correctly!</p>
//           </>
//         )}

//         <button className="popup-close-button" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div> 
//   );
// };

// export default Popup;


import React from 'react';
import './Popup.css';

const Popup = ({
  score,
  totalAudioPlayed,
  memoryScore,
  sequencingScore,
  distractionRawScore,
  distractionScore,
  onClose,
  isTestScreen6,
  isTestScreen7,
  isTestScreen8,
  isTestScreen9,
  isTestScreen10,
}) => {
  // Check if the current screen involves memory and sequencing tests
  const isMemoryAndSequencingScreen = isTestScreen6 || isTestScreen7 || isTestScreen8 || isTestScreen9 || isTestScreen10;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Results</h2>

        {isMemoryAndSequencingScreen ? (
          <div className="popup-scores">
            <p className="memory-score">Memory Score: {memoryScore}</p>
            <p className="sequencing-score">Sequencing Score: {sequencingScore}</p>
            {/* Display the distraction raw score and distraction score for TestScreen8, TestScreen9, and TestScreen10 */}
            {(isTestScreen8 || isTestScreen9 || isTestScreen10) && (
              <>
                <p className="distraction-score">Distraction Raw Score: {distractionRawScore}</p>
                <p className="distraction-score">Distraction Score: {distractionScore}</p>
              </>
            )}
          </div>
        ) : (
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
