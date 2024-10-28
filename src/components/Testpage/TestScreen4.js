import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import backendIP from '../../utils/serverData';
import Popup from '../popup/Popup';
import './TestScreen4.css';

const TestScreen4 = () => {
  const { sk, g, folderPath, selectedOptions } = useContext(DataContext);
  const [displayWord, setDisplayWord] = useState('');
  const [options, setOptions] = useState([]);
  const [correctWord, setCorrectWord] = useState('');
  const [score, setScore] = useState(0);
  const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedFiles, setPlayedFiles] = useState(new Set());
  const [showOptions, setShowOptions] = useState(false);
  const [showDisplay, setShowDisplay] = useState(true);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetchSelectedAudio();
  }, [selectedOptions]);

  const constructFilePath = (fileName) => {
    const noiseType = selectedOptions['Noise type']?.value;
    const noiseLevel = selectedOptions['Noise level']?.value;
    if (!noiseType || !noiseLevel) {
      console.error('Noise type or level not selected');
      return '';
    }
    return `${folderPath}/${noiseType}/${noiseLevel}/${fileName}`;
  };

  const fetchAvailableFiles = async () => {
    const noiseType = selectedOptions['Noise type']?.value;
    const noiseLevel = selectedOptions['Noise level']?.value;

    if (!noiseType || !noiseLevel) {
      console.error('Noise type or level not selected');
      return [];
    }

    const response = await fetch(`${backendIP}/audio/listfiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderPath: `${folderPath}/${noiseType}/${noiseLevel}` }),
    });

    if (!response.ok) {
      console.error('Failed to fetch available audio files');
      return [];
    }

    const availableFiles = await response.json();
    return availableFiles;
  };

  const playAudio = async (fileName) => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    try {
      setIsPlaying(true);
      setButtonsDisabled(true);

      const filenameWithPath = constructFilePath(fileName);
      if (!filenameWithPath) {
        console.error('File path construction failed');
        return;
      }

      const response = await fetch(`${backendIP}/audio/getaudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenameWithPath }),
      });

      if (!response.ok) {
        console.error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current.src = audioUrl;
      audioRef.current.onerror = (event) => {
        console.error('Error occurred while loading audio:', event);
        setIsPlaying(false);
        setButtonsDisabled(false);
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setButtonsDisabled(false);
      };

      await new Promise((resolve, reject) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.onerror = reject;
      });

      await audioRef.current.play();
      fetchAudioOptions(fileName);

      setDisplayWord(fileName.replace('.wav', ''));
      setCorrectWord(fileName);
    } catch (error) {
      console.error('Failed to load audio file:', error);
      setIsPlaying(false);
      setButtonsDisabled(false);
    }
  };

  const fetchAudioOptions = async (fileName) => {
    try {
      const availableFiles = await fetchAvailableFiles();
      const filteredFiles = availableFiles.filter(file => file !== fileName && !playedFiles.has(file));

      if (filteredFiles.length < 3) {
        console.warn('Not enough files to display options');
        return;
      }

      const randomFiles = [];
      while (randomFiles.length < 3) {
        const randomIndex = Math.floor(Math.random() * filteredFiles.length);
        const selectedFile = filteredFiles[randomIndex];
        if (!randomFiles.includes(selectedFile)) {
          randomFiles.push(selectedFile);
        }
      }

      const allOptions = [fileName, ...randomFiles];
      setOptions(shuffleArray(allOptions));
    } catch (error) {
      console.error('Failed to fetch audio options:', error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const handleResponse = async (option, responseType) => {
    console.log(`${responseType} button clicked`);
  
    if (!isPlaying && !buttonsDisabled) {
      setButtonsDisabled(true);
  
      if (option === correctWord) {
        setScore((prev) => prev + 1);
        console.log('Correct answer!');
      } else {
        console.log('Wrong answer!');
      }
  
      setTotalAudioPlayed((prev) => prev + 1);
      setOptions([]);
      setShowOptions(false);
      setShowDisplay(true);
  
      // Immediately fetch and play the next audio
      await fetchSelectedAudio();
    }
  };
  

  const handleCorrect = () => handleResponse(correctWord, 'Correct');
  const handleIncorrect = () => handleResponse('', 'Incorrect');

  const handleRepeat = () => {
    console.log('Repeat button clicked');
    if (correctWord && !isPlaying) {
      playAudio(correctWord);
    }
  };

  const handleExit = () => {
    console.log('Exit button clicked');
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);
  const fetchSelectedAudio = async () => {
    try {
      const audioFiles = await fetchAvailableFiles();
      const availableFiles = audioFiles.filter(file => !playedFiles.has(file));
      if (availableFiles.length === 0) {
        console.warn('No available files to play');
        return;
      }
  
      const randomIndex = Math.floor(Math.random() * availableFiles.length);
      const selectedFile = availableFiles[randomIndex];
  
      setDisplayWord(selectedFile.replace('.wav', ''));
      await playAudio(selectedFile);
  
      setPlayedFiles((prev) => new Set(prev).add(selectedFile));
      setButtonsDisabled(false);
    } catch (error) {
      console.error('Error fetching audio or options:', error);
      setButtonsDisabled(false);
    }
  };
  

  const handleShowOptions = () => {
    console.log('Show Options button clicked');
    setShowOptions(!showOptions);
    setShowDisplay(!showDisplay);
  };

  return (
    <div className="test-screen4">
      <div className="header"><span>{g}</span></div>
      <div className="content">
        <h2>{sk}</h2>
        {showDisplay && (
          <>
            <div className="display-script">
              <span>{displayWord}</span>
            </div>
            <div className="audio-icon" onClick={handleRepeat}>
              <span role="img" aria-label="speaker">🔊</span>
            </div>
          </>
        )}
      </div>
      <div className="button-row">
        <button className="show-options-button" onClick={handleShowOptions}>
          {showOptions ? 'Hide Options' : 'Show Options'}
        </button>
      </div>
      {showOptions && (
        <div className="option-buttons">
          {options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              disabled
            >
              {option.replace('.wav', '')}
            </button>
          ))}
        </div>
      )}
      <div className="button-row">
        <button className="correct-button" onClick={handleCorrect} disabled={buttonsDisabled}>Correct</button>
        <button className="incorrect-button" onClick={handleIncorrect} disabled={buttonsDisabled}>Incorrect</button>
        <button className="repeat-button" onClick={handleRepeat} disabled={isPlaying}>Repeat</button>
        <button className="exit-button" onClick={handleExit}>Exit</button>
      </div>
    {showPopup && (
        <Popup score={score} totalAudioPlayed={totalAudioPlayed} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default TestScreen4;
