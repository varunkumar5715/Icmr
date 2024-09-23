import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import Popup from '../popup/Popup'; // Import the Popup component
import './TestScreen6.css'; // Import your CSS for this screen

const TestScreen6 = () => {
  const { folderPath, levelSelection } = useContext(DataContext);
  const [audioFiles, setAudioFiles] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [correctButtonIndices, setCorrectButtonIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());
  const navigate = useNavigate();

  useEffect(() => {
    if (folderPath && levelSelection) {
      loadAudioFilesAndScripts();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [folderPath, levelSelection]);

  const loadAudioFilesAndScripts = async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const response = await fetch(`${backendIP}/audio/listfiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to fetch audio file list: ${errorDetails}`);
        throw new Error(`Failed to fetch audio file list: ${errorDetails}`);
      }

      const audioData = await response.json();
      const totalFiles = levelSelection;
      
      if (audioData.length < totalFiles) {
        console.warn('Not enough audio files available');
        return;
      }

      // Randomly select audio files and scripts
      const selectedFiles = getRandomItems(audioData, totalFiles);
      const selectedScripts = selectedFiles.map(file => file.replace('.wav', ''));

      // Define correct button indices for the visual scripts
      const correctIndices = getRandomItems([...Array(totalFiles).keys()], totalFiles);

      setAudioFiles(selectedFiles);
      setScripts(selectedScripts);
      setCorrectButtonIndices(correctIndices);

      // Generate buttons with placeholders
      const allButtons = Array.from({ length: 12 }, (_, index) => ({
        text: `Button ${index + 1}`,
        isCorrect: correctIndices.includes(index),
      }));

      setButtons(allButtons);

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading audio files and scripts:', error);
      }
    }
  };

  const getRandomItems = (array, count) => {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const playAudio = async (fileName) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }

      if (!fileName || typeof fileName !== 'string') {
        console.error('No file name provided for audio playback');
        return;
      }

      const filenameWithPath = `${folderPath}/${fileName}`;
      console.log(`Requesting audio file: ${filenameWithPath}`);

      const response = await fetch(`${backendIP}/audio/getaudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenameWithPath }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to fetch audio file: ${errorDetails}`);
        throw new Error(`Failed to fetch audio file: ${errorDetails}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setTotalAudioPlayed(prevTotal => prevTotal + 1);
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Failed to load audio file:', error);
      }
    }
  };

  const handleButtonClick = (index) => {
    if (buttons[index].isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    // Optionally, handle incorrect cases
  };

  const handleExit = () => {
    setShowPopup(true); // Show popup when exit button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    navigate('/next-screen'); // Navigate to the next screen
  };

  return (
    <div className="test-screen6">
      <div className="header">
        <span>{levelSelection}</span>
      </div>
      <div className="content">
        {audioFiles.map((file, index) => (
          <div key={index} className="audio-section">
            <h2>Script: {scripts[index]}</h2>
            <button onClick={() => playAudio(file)}>Play Audio</button>
          </div>
        ))}
        <div className="button-row">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={button.isCorrect ? 'correct-button' : 'incorrect-button'}
              onClick={() => handleButtonClick(index)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
      <div className="footer">
        <button className="exit-button" onClick={handleExit}>Exit</button>
      </div>
      {showPopup && (
        <Popup score={score} totalAudioPlayed={totalAudioPlayed} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default TestScreen6;
