import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../../stores/DataContextProvider';
import backendIP from '../../utils/serverData'; // Ensure this is the correct import for your server IP/URL
import './TestScreen2.css';

const TestScreen2 = () => {
  const { sk, g, instruction, folderPath } = useContext(DataContext);
  const [audioUrl, setAudioUrl] = useState(null);
  const [displayScript, setDisplayScript] = useState('');

  useEffect(() => {
    fetchSelectedAudio();
  }, [folderPath]);

  const fetchSelectedAudio = async () => {
    if (folderPath) {
      try {
        // Fetch the list of files from the backend
        const response = await fetch(`${backendIP}/audio/listfiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folderPath }), // Send the folderPath directly
        });

        if (!response.ok) {
          throw new Error('Failed to fetch audio file list');
        }

        const audioData = await response.json();

        // Randomly select an audio file and update the state
        if (audioData.length > 0) {
          const randomIndex = Math.floor(Math.random() * audioData.length);
          const selectedAudio = audioData[randomIndex];

          setAudioUrl(`${backendIP}/audio/getaudio?filename=${selectedAudio.fileName}`);
          setDisplayScript(selectedAudio.script);
        }
      } catch (error) {
        console.error('Error fetching audio file:', error);
      }
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="test-screen2">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        <h2>{sk}</h2>
        <h4>{instruction}</h4>
        <div className="audio-icon" onClick={playAudio}>
          <span role="img" aria-label="speaker">🔊</span>
        </div>
        <h2>{displayScript}</h2>
        {/* <button className="audio-button" onClick={playAudio}>Click to Play Audio</button> */}
      </div>
      <div className="buttons">
                <button className="correct-button">Correct</button>
                <button className="incorrect-button">Incorrect</button>
            </div>
            <div className="bottom-buttons">
                <button className="repeat-button">Repeat</button>
                <button className="exit-button">Exit</button>
            </div>
    </div>
  );
};

export default TestScreen2;
