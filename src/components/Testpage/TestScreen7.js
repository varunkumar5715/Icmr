// import React, { useContext, useEffect, useState } from 'react';
// import DataContext from '../../stores/DataContextProvider';
// import { useNavigate } from 'react-router-dom';
// import './TestScreen7.css';

// const MAX_EDITS = 10; // Define the maximum number of edits allowed

// const TestScreen7 = () => {
//   const { sk, g, playedScripts, updatePlayedScripts, calculateScore } = useContext(DataContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedScripts, setSelectedScripts] = useState([]);
//   const [buttonColors, setButtonColors] = useState([]); // State to manage button colors
//   const [editCount, setEditCount] = useState(0); // State to track the number of edits
//   const navigate = useNavigate();

//   // Initialize played scripts and button colors on component mount
//   useEffect(() => {
//     setSelectedScripts(playedScripts);
//     setButtonColors(Array(playedScripts.length).fill('default')); // Set default color for each button
//   }, [playedScripts]);

//   // Handle response button click to change its color
//   const handleResponseClick = (index) => {
//     if (!isEditing) {
//       const newColors = [...buttonColors];
//       newColors[index] = newColors[index] === 'default' ? 'green' : 'default'; // Toggle between default and green
//       setButtonColors(newColors);
//     } else {
//       // In editing mode, toggle the button color
//       const newColors = [...buttonColors];
//       newColors[index] = newColors[index] === 'default' ? 'green' : 'default'; // Toggle color
//       setButtonColors(newColors);
//     }
//   };

//   // Handle edit button click to allow new responses while retaining existing scripts
//   const handleEdit = () => {
//     if (editCount < MAX_EDITS) {
//       setIsEditing(true);
//       setButtonColors(Array(selectedScripts.length).fill('default')); // Reset all colors to default
//       setEditCount(editCount + 1); // Increment edit count
//     } else {
//       alert(`Maximum edit limit of ${MAX_EDITS} reached!`);
//     }
//   };

//   // Handle submit button click
//   const handleSubmit = () => {
//     if (isEditing) {
//       updatePlayedScripts(selectedScripts); // Update scripts only if editing is active
//     }
//     setIsEditing(false); // End editing mode
//     navigate('/nextAudioScreen');
//   };

//   // Handle exit button click and score calculation
//   const handleExit = () => {
//     const { memoryScore, sequencingScore } = calculateScore(selectedScripts);
//     console.log(`Memory Score: ${memoryScore}, Sequencing Score: ${sequencingScore}`);
//     navigate('/home');
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
//                     {script || 'Response'} {/* Show default text if script is empty */}
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
//     </div>
//   );
// };

// export default TestScreen7;

import React, { useContext, useEffect, useState } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import './TestScreen7.css';

const MAX_EDITS = 10; // Define the maximum number of edits allowed

const TestScreen7 = () => {
  const { sk, g, playedScripts, updatePlayedScripts, calculateScore } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedScripts, setSelectedScripts] = useState([]); // Scripts to display
  const [userResponses, setUserResponses] = useState([]); // State to track user responses
  const [buttonColors, setButtonColors] = useState([]); // State to manage button colors
  const [editCount, setEditCount] = useState(0); // State to track the number of edits
  const navigate = useNavigate();

  // Initialize played scripts and button colors on component mount
  useEffect(() => {
    setSelectedScripts(playedScripts);
    setUserResponses(Array(playedScripts.length).fill('')); // Initialize responses to empty strings
    setButtonColors(Array(playedScripts.length).fill('default')); // Set default color for each button
  }, [playedScripts]);

  // Handle response button click to change its color
  const handleResponseClick = (index) => {
    const newColors = [...buttonColors];

    // Change color to green and allow editing
    if (isEditing) {
      newColors[index] = 'green'; // Set color to green
      const newResponses = [...userResponses];
      newResponses[index] = ''; // Clear response for the selected script
      setUserResponses(newResponses); // Update user responses
    } else {
      // If not in editing mode, toggle the color between default and green
      newColors[index] = newColors[index] === 'default' ? 'green' : 'default'; // Toggle color
    }

    setButtonColors(newColors); // Update button colors
  };

  // Handle edit button click to allow new responses
  const handleEdit = () => {
    if (editCount < MAX_EDITS) {
      setIsEditing(true);
      setButtonColors(Array(selectedScripts.length).fill('default')); // Reset all colors to default
      setUserResponses(Array(selectedScripts.length).fill('')); // Clear user responses for new input
      setEditCount(editCount + 1); // Increment edit count
    } else {
      alert(`Maximum edit limit of ${MAX_EDITS} reached!`);
    }
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (isEditing) {
      updatePlayedScripts(userResponses); // Update scripts with user responses
      console.log('Responses submitted:', userResponses); // Log current responses
      setIsEditing(false); // End editing mode
    }

    // Reset button colors and scripts for the next round
    setButtonColors(Array(selectedScripts.length).fill('default')); // Reset button colors
    setSelectedScripts([]); // Clear scripts for the next round
    navigate('/testScreen6'); // Navigate back to TestScreen6
  };

  // Handle exit button click and score calculation
  const handleExit = () => {
    const { memoryScore, sequencingScore } = calculateScore(userResponses);
    console.log(`Memory Score: ${memoryScore}, Sequencing Score: ${sequencingScore}`);
    navigate('/home');
  };

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
                    className={`response-btn ${buttonColors[index]}`} // Updated button class name
                    onClick={() => handleResponseClick(index)}
                  >
                    {userResponses[index] || script} {/* Show user response or script text */}
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
    </div>
  );
};

export default TestScreen7;
