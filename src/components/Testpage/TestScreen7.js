

// import React, { useContext, useEffect, useState } from 'react';
// import DataContext from '../../stores/DataContextProvider';
// import { useNavigate } from 'react-router-dom';
// import Popup from '../popup/Popup'
// import './TestScreen7.css';

// const MAX_EDITS = 10; // Define the maximum number of edits allowed

// const TestScreen7 = () => {
//   const { sk, g, playedScripts, updatePlayedScripts } = useContext(DataContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedScripts, setSelectedScripts] = useState([]); // Scripts to display
//   const [userResponses, setUserResponses] = useState([]); // State to track user responses
//   const [buttonColors, setButtonColors] = useState([]); // State to manage button colors
//   const [editCount, setEditCount] = useState(0); // State to track the number of edits
//   const [memoryScore, setMemoryScore] = useState(0); // State to track memory score
//   const [sequencingScore, setSequencingScore] = useState(0); // State to track sequencing score
//   const [showPopup, setShowPopup] = useState(false); // State to control the display of the Popup
//   const navigate = useNavigate();

//   // Initialize played scripts and button colors on component mount
//   useEffect(() => {
//     setSelectedScripts(playedScripts);
//     setUserResponses(Array(playedScripts.length).fill('')); // Initialize responses to empty strings
//     setButtonColors(Array(playedScripts.length).fill('default')); // Set default color for each button
//   }, [playedScripts]);

//   // Handle response button click to change its color
//   const handleResponseClick = (index) => {
//     const newColors = [...buttonColors];
//     const newResponses = [...userResponses];

//     // Allow editing and update color to green
//     if (isEditing) {
//       newColors[index] = 'green'; // Set color to green
//       newResponses[index] = selectedScripts[index]; // Update response with selected script
//     } else {
//       // If not in editing mode, toggle the color between default and green
//       newColors[index] = newColors[index] === 'default' ? 'green' : 'default'; // Toggle color
//     }

//     setButtonColors(newColors); // Update button colors
//     setUserResponses(newResponses); // Update user responses
//     console.log('User Responses:', newResponses);
//   };

//   // Handle edit button click to allow new responses
//   const handleEdit = () => {
//     if (editCount < MAX_EDITS) {
//       setIsEditing(true);
//       setButtonColors(Array(selectedScripts.length).fill('default')); // Reset all colors to default
//       setUserResponses(Array(selectedScripts.length).fill('')); // Clear user responses for new input
//       setEditCount(editCount + 1); // Increment edit count
//     } else {
//       alert(`Maximum edit limit of ${MAX_EDITS} reached!`);
//     }
//   };

//   // Calculate memory and sequencing scores based on user responses
//   const calculateScores = () => {
//     let tempCount=0;
//     let memoryCount = 0;
//     let sequenceCount = 0;

//     // Calculate memory score
//     selectedScripts.forEach((script, index) => {
//       if(userResponses.includes(script))      
//         tempCount += 1; // Correct response 
//       if(userResponses[index]===selectedScripts[index] && sequenceCount!==-1)      
//         sequenceCount += 1; // Correct response
//       else
//       sequenceCount = -1
//     });

  
  
    

//     // // Calculate sequencing score
//     // let expectedSequence = 0; // Track the expected sequence position
//     // userResponses.forEach((response, index) => {
//     //   if (response === selectedScripts[expectedSequence]) {
//     //     sequenceCount += 1; // Correct sequence response
//     //     expectedSequence += 1; // Move to the next expected sequence
//     //   }
//     // });

//     setMemoryScore(memoryCount);
//     console.log('Memory Score:', memoryCount);
//     setSequencingScore(sequenceCount);
//     console.log('Sequencing Score:', sequenceCount);
//   };

//   // Handle submit button click
//   const handleSubmit = () => {
//     if (isEditing) {
//       updatePlayedScripts(userResponses); // Update scripts with user responses
//       console.log('Responses submitted:', userResponses); // Log current responses
//       setIsEditing(false); // End editing mode
//     }

//     // Reset button colors and scripts for the next round
//     setButtonColors(Array(selectedScripts.length).fill('default')); // Reset button colors
//     setSelectedScripts([]); // Clear scripts for the next round
//     navigate('/testScreen6'); // Navigate back to TestScreen6
//   };

//   // Handle exit button click and score calculation
//   const handleExit = () => {
//     calculateScores(); // Calculate the scores before showing the popup
//     setShowPopup(true); // Show the Popup with the scores
//   };

//   // Close the popup
//   const handleClosePopup = () => {
//     setShowPopup(false); // Hide the popup
//     navigate('/home'); // Navigate to home after closing the popup
//   };

//   return (
//     <div className="test-screen7">
//       <div className="header">
//         <span>{g}</span>
//       </div>
//       <div className="content">
//         <h2>{sk}</h2>
//         <div className="scripts-display">
//           <ul>
//             {selectedScripts.length > 0 ? (
//               selectedScripts.map((script, index) => (
//                 <li key={index}>
//                   <button
//                     className={`response-btn ${buttonColors[index]}`} // Updated button class name
//                     onClick={() => handleResponseClick(index)}
//                   >
//                     {userResponses[index] || script} {/* Show user response or script text */}
//                   </button>
//                 </li>
//               ))
//             ) : (
//               <li>No played scripts available.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//       <div className="control-buttons">
//         <button className="control-btn edit-btn" onClick={handleEdit}>Edit</button>
//         <button className="control-btn submit-btn" onClick={handleSubmit}>Submit</button>
//         <button className="control-btn exit-btn" onClick={handleExit}>Exit</button>
//       </div>

//       {/* Popup component to display the results */}
//    {/* Popup component to display the results */}
// {showPopup && (
//   <Popup
//     score={memoryScore} // Pass the memory score
//     totalAudioPlayed={selectedScripts.length} // Pass the total number of scripts played
//     memoryScore={memoryScore} // Pass the memory score
//     sequencingScore={sequencingScore} // Pass the sequencing score
//     onClose={handleClosePopup} // Function to close the popup
//   />
// )}

//     </div>
//   );
// };

// export default TestScreen7;

import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';
import './TestScreen7.css';

const TestScreen7 = () => {
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

  useEffect(() => {
    setSelectedScripts(playedScripts);
    setUserResponses(Array(playedScripts.length).fill('')); 
    setButtonColors(Array(playedScripts.length).fill('default')); 
  }, [playedScripts]);
  const handleResponseClick = (index) => {
    if (isExiting) return;
  
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
  };

  const checkSequence = (currentResponseOrder) => {
    // Check if the current response order matches the order of selectedScripts
    return currentResponseOrder.every((response, index) => response === selectedScripts[index]) ? 1 : 0;
  };
  
  const calculateScores = () => {
    let memoryCount = 0;
    let sequenceCount = 0;
  
    // Check if all responses are correct, regardless of order
    const allCorrect = selectedScripts.every(script => 
      userResponses.includes(script)
    );
  
    if (allCorrect) {
      memoryCount = 1;
    }
  
    // Check if the responses are in the correct sequence
    sequenceCount = checkSequence(responseOrder);
  
    console.log(`Final Scores - Memory Count: ${memoryCount}, Sequence Count: ${sequenceCount}`);
  
    return { memoryCount, sequenceCount };
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isExiting) return;

    const { memoryCount, sequenceCount } = calculateScores();

    updateMemoryScoreCount((prev) => prev + memoryCount); 
    updateSequenceScoreCount((prev) => prev + sequenceCount);

    console.log('Updated Memory Score Count:', memoryScoreCount + memoryCount);
    console.log('Updated Sequence Score Count:', sequenceScoreCount + sequenceCount);

    updateTotalSetsPlayed(totalSetsPlayed+1);
    console.log('Total Sets Played:', totalSetsPlayed + 1);

    updatePlayedScripts(userResponses);

    setTimeout(() => {
      if (!isExiting) {
        setButtonColors(Array(selectedScripts.length).fill('default'));
        setSelectedScripts([]);
        navigate('/testScreen6');
      }
    }, 3000);
  };

  const handleExit = (e) => {
    e.preventDefault();
    if (isExiting) return; 
    console.log('Exit button clicked.');
    setIsExiting(true); 
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home');
  };

  const memoryScore = `${memoryScoreCount}/${totalSetsPlayed}`;
  const sequenceScore = `${sequenceScoreCount}/${totalSetsPlayed}`;

  return (
    <div className="test-screen7">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        <h2>{sk}</h2>
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
        <button className="control-btn edit-btn" onClick={handleEdit}>Edit</button>
        <button className="control-btn submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="control-btn exit-btn" onClick={handleExit}>Exit</button>
      </div>

      {showPopup && (
        <Popup
          memoryScore={memoryScore}
          sequencingScore={sequenceScore}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default TestScreen7;
