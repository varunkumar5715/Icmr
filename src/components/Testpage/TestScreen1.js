// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaVolumeUp } from 'react-icons/fa';
// import './TestScreen1.css';

// const AudioFileController = {
//   async getAudio(path) {
//     try {
//       console.log('Fetching audio from path:', path);
//       const response = await fetch(path);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const blob = await response.blob();
//       const audioURL = URL.createObjectURL(blob);
//       console.log('Audio URL:', audioURL);
//       return audioURL;
//     } catch (error) {
//       console.error('Error fetching audio:', error.message);
//       return null;
//     }
//   }
// };

// const TestScreen1 = () => {
//   const [audioFiles] = useState({
//     1: 'eight.wav',
//     2: 'eighteen.wav',
//     3: 'eleven.wav'
//   });
//   const [clickedButton, setClickedButton] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const navigate = useNavigate();

//   const correctAudioId = 2; // Example of a correct answer
//   const folderPath = '/audiofiles/auditory/audidisspe/durationdis/varyingdissyl';

//   const handleAudioClick = async (audioId) => {
//     const path = `${folderPath}/${audioFiles[audioId]}`;
//     const audioUrl = await AudioFileController.getAudio(path);

//     if (audioUrl) {
//       const audio = new Audio(audioUrl);
//       audio.addEventListener('error', (e) => {
//         console.error('Error playing audio:', e);
//       });
//       audio.addEventListener('canplaythrough', () => {
//         console.log('Audio can play through');
//         audio.play();
//       });
//       audio.play().catch(error => {
//         console.error('Playback failed:', error);
//       });
//       setClickedButton(audioId);
//       setIsCorrect(audioId === correctAudioId);
//       console.log(`Playing audio ${audioId}`);
//     } else {
//       console.error('Failed to get audio URL');
//     }
//   };

//   const handleExitClick = () => {
//     console.log('Exit button clicked');
//     navigate('/instruction');
//   };

//   return (
//     <div className="test-screen">
//       <div className="header">
//         <span>Skill</span>
//       </div>
//       <div className="content">
//         <h2>Goal and Level Instruction</h2>
//         <div className="audio-buttons">
//           {Object.keys(audioFiles).map((id) => (
//             <button
//               key={id}
//               className={`audio-button ${clickedButton === parseInt(id) ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
//               onClick={() => handleAudioClick(parseInt(id))}
//             >
//               <FaVolumeUp className="audio-icon" /> 
//               {id} 
//             </button>
//           ))}
//         </div>
//       </div>
//       <button className="exit-button" onClick={handleExitClick}>
//         Exit
//       </button>
//     </div>
//   );
// };

// export default TestScreen1;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVolumeUp } from 'react-icons/fa';
import './TestScreen1.css';

const TestScreen1 = () => {
  const [clickedButton, setClickedButton] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const handleAudioClick = async (audioFileName) => {
    const audioUrl = `${process.env.PUBLIC_URL}/audiofiles/auditory/audidisspe/durationdis/varyingdissyl/${audioFileName}`;

    try {
      const audio = new Audio(audioUrl);
      audio.addEventListener('error', (e) => {
        console.error('Error playing audio:', e);
      });
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio can play through');
        audio.play();
      });
      audio.play().catch(error => {
        console.error('Playback failed:', error);
      });

      // Assuming you have a mechanism to determine correctness
      setIsCorrect(true); // Change based on your logic
      console.log(`Playing audio ${audioFileName}`);
    } catch (error) {
      console.error('Failed to play audio:', error.message);
    }
  };

  const handleExitClick = () => {
    console.log('Exit button clicked');
    navigate('/instruction');
  };

  return (
    <div className="test-screen">
      <div className="header">
        <span>Skill</span>
      </div>
      <div className="content">
        <h2>Goal and Level Instruction</h2>
        <div className="audio-buttons">
          <button
            className={`audio-button ${clickedButton === 'eight.wav' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAudioClick('eight.wav')}
          >
            <FaVolumeUp className="audio-icon" />
            1
          </button>
          <button
            className={`audio-button ${clickedButton === 'eighteen.wav' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAudioClick('eighteen.wav')}
          >
            <FaVolumeUp className="audio-icon" />
            2
          </button>
          <button
            className={`audio-button ${clickedButton === 'eleven.wav' ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAudioClick('eleven.wav')}
          >
            <FaVolumeUp className="audio-icon" />
            3
          </button>
          {/* Add more buttons for additional audio files */}
        </div>
      </div>
      <button className="exit-button" onClick={handleExitClick}>
        Exit
      </button>
    </div>
  );
};

export default TestScreen1;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaVolumeUp } from 'react-icons/fa';
// import './TestScreen1.css';
// import data from '../../utils/Dataflow.json'; // Adjust path as per your project structure

// const TestScreen1 = () => {
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [clickedButton, setClickedButton] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAudioFiles(data.folderName); // Fetch audio files based on folderName when component mounts
//   }, [data.folderName]);

//   const fetchAudioFiles = async (folderName) => {
//     try {
//       const response = await fetch(`${process.env.PUBLIC_URL}/audiofiles/${folderName}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const files = await response.json(); // Assuming your backend returns JSON array of file names
//       setAudioFiles(files);
//       console.log('Fetched audio files:', files); // Log fetched files for debugging
//     } catch (error) {
//       console.error('Error fetching audio files:', error);
//     }
//   };

//   const handleAudioClick = async (fileName) => {
//     const audioUrl = `${process.env.PUBLIC_URL}/audiofiles/${data.folderName}/${fileName}`;

//     try {
//       const audio = new Audio(audioUrl);
//       audio.addEventListener('error', (e) => {
//         console.error('Error playing audio:', e);
//       });
//       audio.addEventListener('canplaythrough', () => {
//         console.log('Audio can play through');
//         audio.play();
//       });
//       audio.play().catch(error => {
//         console.error('Playback failed:', error);
//       });

//       // Assuming you have a mechanism to determine correctness
//       setIsCorrect(true); // Change based on your logic
//       setClickedButton(fileName); // Update clickedButton state
//       console.log(`Playing audio ${fileName}`);
//     } catch (error) {
//       console.error('Failed to play audio:', error.message);
//     }
//   };

//   const handleExitClick = () => {
//     console.log('Exit button clicked');
//     navigate('/instruction');
//   };

//   return (
//     <div className="test-screen">
//       <div className="header">
//         <span>{data.title}</span>
//       </div>
//       <div className="content">
//         <h2>Goal and Level Instruction</h2>
//         <p>{data.instruction}</p>
//         <div className="audio-buttons">
//           {audioFiles.map((fileName, index) => (
//             <button
//               key={index}
//               className={`audio-button ${clickedButton === fileName ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
//               onClick={() => handleAudioClick(fileName)}
//             >
//               <FaVolumeUp className="audio-icon" />
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//       <button className="exit-button" onClick={handleExitClick}>
//         Exit
//       </button>
//     </div>
//   );
// };

// export default TestScreen1;


