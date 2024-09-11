
import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import backendIP from '../../utils/serverData';
import Popup from '../popup/Popup';
import './TestScreen4.css'; // Ensure this CSS file exists and is correctly applied

const TestScreen4 = () => {
  const { sk, g,instruction, folderPath, selectedOptions } = useContext(DataContext);
  const [displayWord, setDisplayWord] = useState('');
  const [options, setOptions] = useState([]);
  const [correctWord, setCorrectWord] = useState('');
  const [score, setScore] = useState(0);
  const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track audio state
  const [playedFiles, setPlayedFiles] = useState(new Set()); // Track played files

  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetchSelectedAudio();
  }, [selectedOptions]); // Fetch audio when selected options change

  const constructFilePath = (fileName) => {
    const noiseType = selectedOptions['Noise type']?.value;
    const noiseLevel = selectedOptions['Noise level']?.value;
    if (!noiseType || !noiseLevel) {
      console.error('Noise type or level not selected');
      return '';
    }
    const path = `${folderPath}/${noiseType}/${noiseLevel}/${fileName}`;
    console.log(`Constructed file path: ${path}`); // Add logging
    return path;
  };
  
  const playAudio = async (fileName) => {
    if (isPlaying) {
      // Pause and reset the current audio
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  
    try {
      setIsPlaying(true);
  
      // Construct the correct file path
      const filenameWithPath = constructFilePath(fileName);
      if (!filenameWithPath) {
        console.error('File path construction failed');
        return;
      }
      console.log(`Requesting audio file: ${filenameWithPath}`);
  
      const response = await fetch(`${backendIP}/audio/getaudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenameWithPath }), // Corrected key here
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to fetch audio file: ${response.status} ${response.statusText} - ${errorDetails}`);
        throw new Error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
      }
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
  
      audioRef.current.src = audioUrl;
      audioRef.current.onerror = (event) => {
        console.error('Error occurred while loading audio:', event);
        setIsPlaying(false);
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
  
      // Wait for the audio to be ready and then play it
      await new Promise((resolve, reject) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.onerror = reject;
      });
  
      await audioRef.current.play();
      // Fetch options for the current audio file
      fetchAudioOptions(fileName);
  
    } catch (error) {
      console.error('Failed to load audio file:', error);
      setIsPlaying(false);
    }
  };
  

  const fetchAudioOptions = async (fileName) => {
    console.log('Fetching audio options for file:', fileName);

    try {
      const response = await fetch(`${backendIP}/audio/getoptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Failed to fetch options: ${response.status} ${response.statusText} - ${errorDetails}`);
        throw new Error(`Failed to fetch options: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Options fetched:', data);

      setOptions(data.options);
      setCorrectWord(data.correctWord);
    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  const handleCorrect = () => {
    if (!isPlaying) {
      setScore(prev => prev + 1);
      setTotalAudioPlayed(prev => prev + 1);
      fetchSelectedAudio(); // Fetch new audio
    }
  };

  const handleIncorrect = () => {
    if (!isPlaying) {
      setTotalAudioPlayed(prev => prev + 1);
      fetchSelectedAudio(); // Fetch new audio
    }
  };

  const handleRepeat = () => {
    if (correctWord && !isPlaying) {
      playAudio(correctWord); // Repeat correct word
    }
  };

  const handleExit = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const fetchSelectedAudio = async () => {
    console.log('Fetching selected audio based on options:', selectedOptions);

    try {
      // List of files to choose from
      const audioFiles = ['one.wav', 'two.wav', 'three.wav', 'four.wav', 'five.wav']; // Adjust if needed

      // Filter out already played files
      const availableFiles = audioFiles.filter(file => !playedFiles.has(file));
      if (availableFiles.length === 0) {
        console.warn('No available files to play');
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableFiles.length);
      const selectedFile = availableFiles[randomIndex];

      console.log('Selected file for playback:', selectedFile);

      setDisplayWord(selectedFile);
      await playAudio(selectedFile);

      setPlayedFiles(prev => new Set(prev).add(selectedFile));
    } catch (error) {
      console.error('Error fetching audio or options:', error);
    }
  };

  return (
    <div className="test-screen4">
      <div className="header"><span>{g}</span></div>
      <div className="content">
        <h2>{sk}</h2>
        <div className="audio-icon" onClick={handleRepeat}>
          <span role="img" aria-label="speaker">🔊</span>
        </div>
        <div className="display-word"><h3>{displayWord}</h3></div>
      </div>
      <div className="option-buttons">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${option.split(' ').length > 1 ? 'multi-word' : 'single-word'}`}
            onClick={() => {
              if (!isPlaying) {
                option === correctWord ? handleCorrect() : handleIncorrect();
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="button-row">
        <button className="correct-button" onClick={handleCorrect} disabled={isPlaying}>Correct</button>
        <button className="incorrect-button" onClick={handleIncorrect} disabled={isPlaying}>Incorrect</button>
        <button className="repeat-button" onClick={handleRepeat}>Repeat</button>
        <button className="exit-button" onClick={handleExit}>Exit</button>
      </div>
      {showPopup && <Popup score={score} totalAudioPlayed={totalAudioPlayed} onClose={handleClosePopup} />}
    </div>
  );
};

export default TestScreen4;
