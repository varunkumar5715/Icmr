
import React, { useContext, useState, useEffect, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import backendIP from '../../utils/serverData';
import Popup from '../popup/Popup';
import './TestScreen4.css'; // Ensure this CSS file exists and is correctly applied

const TestScreen5 = () => {
  const { sk, g, instruction, folderPath } = useContext(DataContext);
  const [displayWord, setDisplayWord] = useState('');
  const [options, setOptions] = useState([]);
  const [correctWord, setCorrectWord] = useState('');
  const [score, setScore] = useState(0);
  const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track audio state
  const [playedFiles, setPlayedFiles] = useState(new Set()); // Track played files

  const audioRef = useRef(new Audio());

  // Mapping between words and filenames
  const wordToFileMapping = {
    'varun': 'one.wav',
    'prashanth': 'two.wav',
    'hemanth': 'three.wav',
    'sky': 'four.wav',
    'car': 'five.wav',
    'bus': 'six.wav',
    'aeroplane': 'seven.wav',
    'mandya': 'eight.wav',
    'mysore': 'nine.wav',
    'ten': 'ten.wav'
  };

  const words = Object.keys(wordToFileMapping);

  useEffect(() => {
    fetchSelectedAudio();
  }, [folderPath]);

  const playAudio = async (fileName) => {
    if (isPlaying) {
      // Pause and reset the current audio
      audioRef.current.pause();
      audioRef.current.src = '';
    }

    try {
      setIsPlaying(true);

      const filenameWithPath = `${folderPath}/${fileName}`;
      // console.log(`Requesting audio file: ${filenameWithPath}`);

      const response = await fetch(`${backendIP}/audio/getaudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenameWithPath }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to fetch audio file: ${response.status} ${response.statusText} - ${errorDetails}`);
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
      fetchAudioOptions(fileName);

    } catch (error) {
      console.error('Failed to load audio file:', error);
      setIsPlaying(false);
    }
  };

  const fetchAudioOptions = async (fileName) => {
    // console.log('Fetching audio options for file:', fileName);

    try {
      const response = await fetch(`${backendIP}/audio/getoptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });

      // console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error details:', errorDetails);
        throw new Error(`Failed to fetch options: ${response.status} ${response.statusText} - ${errorDetails}`);
      }

      const data = await response.json();
      // console.log('Fetched data:', data);
      setOptions(data.options);

    } catch (error) {
      console.error('Failed to fetch options:', error);
    }
  };

  const fetchSelectedAudio = async () => {
    try {
      // If all files have been played, reset tracking
      if (playedFiles.size === words.length) {
        setPlayedFiles(new Set());
      }

      // Pick a random word that has not been played yet
      const availableWords = words.filter(word => !playedFiles.has(word));
      if (availableWords.length === 0) {
        console.error('No available audio files to play');
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const selectedWord = availableWords[randomIndex];
      const correctFileName = wordToFileMapping[selectedWord];

      setCorrectWord(selectedWord);
      setDisplayWord(selectedWord);

      // Play the selected audio
      await playAudio(correctFileName);

      // Add the selected file to played files
      setPlayedFiles(prevPlayedFiles => new Set(prevPlayedFiles).add(selectedWord));

    } catch (error) {
      console.error('Error fetching audio or options:', error);
    }
  };

  const handleCorrect = () => {
    if (!isPlaying) {
      setScore(prevScore => prevScore + 1);
      setTotalAudioPlayed(prevTotal => prevTotal + 1);
      fetchSelectedAudio();
    }
  };

  const handleIncorrect = () => {
    if (!isPlaying) {
      setTotalAudioPlayed(prevTotal => prevTotal + 1);
      fetchSelectedAudio();
    }
  };

  const handleRepeat = () => {
    if (correctWord && !isPlaying) {
      playAudio(wordToFileMapping[correctWord]);
    }
  };

  const handleExit = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="test-screen4">
      <div className="header">
        <span>{g}</span> {/* Display 'g' */}
      </div>
      <div className="content">
        <h2>{sk}</h2> {/* Display 'sk' */}
        <h4>{instruction}</h4> {/* Display 'instruction' */}
        <div className="audio-icon" onClick={handleRepeat}>
          <span role="img" aria-label="speaker">🔊</span>
        </div>
        <h2 className="display-word">{displayWord}</h2>
      </div>
      <div className="option-buttons">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${option.split(' ').length > 1 ? 'multi-word' : 'single-word'}`}
            onClick={() => {
              if (!isPlaying) {
                if (option === correctWord) {
                  handleCorrect();
                } else {
                  handleIncorrect();
                }
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="button-row">
        <button 
          className="correct-button"
          onClick={handleCorrect}
          disabled={isPlaying} // Disable button while audio is playing
        >
          Correct
        </button>
        <button 
          className="incorrect-button"
          onClick={handleIncorrect}
          disabled={isPlaying} // Disable button while audio is playing
        >
          Incorrect
        </button>
        <button 
          className="repeat-button"
          onClick={handleRepeat}
        >
          Repeat
        </button>
        <button 
          className="exit-button"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
      {showPopup && (
        <Popup 
          score={score} 
          totalAudioPlayed={totalAudioPlayed} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

export default TestScreen5;
