import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaVolumeUp, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import { getAudio } from '../../utils/AudiofileHandling';
import DataContext from '../../stores/DataContextProvider';
import Popup from '../popup/Popup';
import './TestScreen1.css';
const TestScreen2 = () => {
  const { sk, g, instruction, selectedOptions, folderPath, isi, ibi } = useContext(DataContext);
  const [audioSet, setAudioSet] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [exitClicked, setExitClicked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAudioFilesPlayed, setTotalAudioFilesPlayed] = useState(0);
  const [totalSetsPlayed, setTotalSetsPlayed] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isSetGenerated, setIsSetGenerated] = useState(false); // Flag to track set generation status
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered: exitClicked:", exitClicked, "isSetGenerated:", isSetGenerated);
    if (!exitClicked && !isSetGenerated) {
      generateFileSet();
    }
  }, [selectedOptions, folderPath, exitClicked, isSetGenerated]);

  useEffect(() => {
    if (audioSet.length > 0 && !isPlaying && !exitClicked) {
      console.log("Playing audio set:", audioSet);
      playAudioSet();
    }
  }, [audioSet]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        console.log("Cleaning up audio player...");
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const fetchAudioFiles = async (path) => {
    console.log(`Fetching audio files from: ${path}`);
    try {
      const response = await fetch(`${backendIP}/audio/listfiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folderPath: path }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audio file list');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching audio file list:', error);
      return [];
    }
  };

  const generateFileSet = async () => {
    if (isSetGenerated) {
      console.log("File set already generated. Exiting...");
      return; // Prevent multiple executions
    }

    console.log("Generating new file set...");
    setIsSetGenerated(true); // Set the flag to true

    const standardFolder = selectedOptions.Standard ? selectedOptions.Standard.value : '';
    const variableFolder = selectedOptions.Variable ? selectedOptions.Variable.value : '';

    console.log(`Standard Folder Path: ${folderPath}/standard/${standardFolder}`);
    console.log(`Variable Folder Path: ${folderPath}/variable/${variableFolder}`);

    const paths = {
      standard: `${folderPath}/standard/${standardFolder}/`,
      variable: `${folderPath}/variable/${variableFolder}/`,
    };

    try {
      const [standardFiles, variableFiles] = await Promise.all([
        fetchAudioFiles(paths.standard),
        fetchAudioFiles(paths.variable),
      ]);

      console.log("Standard Files:", standardFiles);
      console.log("Variable Files:", variableFiles);

      if (standardFiles.length === 0 || variableFiles.length === 0) {
        console.warn("No audio files found for selected folders.");
        return;
      }

      const fileList = [
        ...Array(2).fill().map(() => ({
          path: `${paths.standard}${standardFiles[Math.floor(Math.random() * standardFiles.length)]}`,
          type: 'standard'
        })),
        {
          path: `${paths.variable}${variableFiles[Math.floor(Math.random() * variableFiles.length)]}`,
          type: 'variable'
        },
      ];

      console.log("Initial File List:", fileList);

      const shuffledFileList = fileList.sort(() => Math.random() - 0.5);
      console.log("Shuffled File List:", shuffledFileList);

      setAudioSet(shuffledFileList);
      setButtonColors(Array(shuffledFileList.length).fill(''));
      setIsRepeating(false);
    } catch (error) {
      console.error("Error generating file set:", error);
    }
  };

  const playAudioSet = async () => {
    setIsPlaying(true);
    const initialTotalAudioFilesPlayed = totalAudioFilesPlayed; // Store the initial count for repeat check

    for (let i = 0; i < audioSet.length; i++) {
      const { path } = audioSet[i];
      console.log(`Playing audio: ${path}`);

      await new Promise((resolve) => {
        getAudio(path, async (audioUrl) => {
          if (audioUrl) {
            await playAudio(audioUrl);
          }
          resolve();
        });
      });

      // Only increment for new audio files
      if (!isRepeating) {
        setTotalAudioFilesPlayed(prev => prev + 1);
      }

      if (i < audioSet.length - 1) {
        await delay(parseInt(isi, 10) * 1000);
      }
    }

    setIsPlaying(false);

    if (!exitClicked && !isRepeating) {
      await delay(parseInt(ibi, 10) * 1000);

      // Increment Total Sets Played here, after all audios in the set have played
      setTotalSetsPlayed(prev => prev + 1);

      setIsSetGenerated(false); // Reset flag to allow generating a new set
    } else if (isRepeating) {
      setIsRepeating(false); // Reset repeating flag when done
    }
  };

  const playAudio = (audioUrl) => {
    return new Promise((resolve) => {
      console.log(`Playing audio URL: ${audioUrl}`);
      const audioElement = new Audio(audioUrl);
      audioElement.play();
      audioElement.onended = resolve;
      audioRef.current = audioElement;
    });
  };

  const handleAudioClick = (index) => {
    if (isPlaying || buttonColors[index]) return;

    console.log(`Audio button clicked: index=${index}, type=${audioSet[index].type}`);

    const selectedAudio = audioSet[index];
    const newButtonColors = [...buttonColors];

    if (selectedAudio.type === 'variable') {
      newButtonColors[index] = 'correct'; // Green color for correct (variable)
      setCorrectAnswers(prev => prev + 1);
    } else {
      newButtonColors[index] = 'wrong'; // Red color for wrong (standard)
    }

    setButtonColors(newButtonColors);

    if (newButtonColors.every(color => color !== '')) {
      setTimeout(() => {
        console.log("All buttons clicked. Generating new file set...");
        generateFileSet(); // Generate the next set of audio files
      }, parseInt(ibi, 10) * 1000);
    }
  };

  const handleExitClick = () => {
    if (exitClicked) return; // Prevent multiple exits

    console.log("Exit button clicked");
    setExitClicked(true);
    setIsPlaying(false);

    // Calculate final score based on totalSetsPlayed
    const finalScore = (correctAnswers / totalSetsPlayed) * 100;
    setScore(finalScore.toFixed(2));

    setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const handleRepeatClick = () => {
    if (audioSet.length > 0 && !isPlaying) {
      console.log("Repeat button clicked");
      setIsRepeating(true);
      setButtonColors(Array(audioSet.length).fill('')); // Reset button colors
      playAudioSet(); // Play the same set without incrementing totalAudioFilesPlayed or totalSetsPlayed
    }
  };

  const closePopup = () => {
    console.log("Closing popup and navigating to instruction");
    setShowPopup(false);
    navigate('/instruction');
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="test-screen">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        <h2>{sk}</h2>
        <h4>{instruction}</h4>
        <div className="audio-buttons">
          {audioSet.length === 3 ? (
            audioSet.map((audio, index) => (
              <button
                key={index}
                className={`audio-button ${buttonColors[index]}`}
                onClick={() => handleAudioClick(index)}
                disabled={buttonColors[index] !== ''} // Disable button if already clicked
              >
                <FaVolumeUp className="audio-icon" />
                {index + 1}
              </button>
            ))
          ) : (
            <p>No audio files available.</p>
          )}
        </div>
        <button
          className="repeat-button"
          onClick={handleRepeatClick}
          disabled={isPlaying || audioSet.length === 0}
        >
          <FaRedo /> Repeat
        </button>
      </div>
      <button className="exit-button" onClick={handleExitClick}>
        Exit
      </button>

      {showPopup && (
        <Popup
          score={`${correctAnswers}`} // Display score as correctAnswers/totalSetsPlayed
          totalAudioPlayed={totalSetsPlayed}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default TestScreen2;
