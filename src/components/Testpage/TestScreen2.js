import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaVolumeUp, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import { getAudio } from '../../utils/AudiofileHandling';
import DataContext from '../../stores/DataContextProvider';

import Popup from '../popup/Popup';
import './TestScreen2.css';

const TestScreen2 = () => {
  const { sk, g, instruction, selectedOptions, folderPath, isi, ibi } = useContext(DataContext);
  const [audioSet, setAudioSet] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalAudioFilesPlayed, setTotalAudioFilesPlayed] = useState(0);
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState([]);
  const [totalSetsPlayed, setTotalSetsPlayed] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [exitClicked, setExitClicked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAudioFiles, setTotalAudioFiles] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef(null);
 
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

  // First pick the file from the backend - totalfileList
  const generateFileSet = async () => {
    // console.log('generateFileSet called');
    const standardFolder = selectedOptions.Standard ? selectedOptions.Standard.value : '';
    const variableFolder = selectedOptions.Variable ? selectedOptions.Variable.value : '';

    const paths = {
      standard: `${folderPath}/standard/${standardFolder}/`,
      variable: `${folderPath}/variable/${variableFolder}/`,
    };

    const standardFiles = await fetchAudioFiles(paths.standard);

    const pickRandomFile = (fileList) => {
      return fileList[Math.floor(Math.random() * fileList.length)];
    };

    // Pick one standard file to play twice and the same file from variable
    const standardFileName = pickRandomFile(standardFiles);

    // Create an array with two standard and one variable audio file, using the same file
    const fileList = [
      { path: `${paths.standard}${standardFileName}`, type: 'standard' },
      { path: `${paths.standard}${standardFileName}`, type: 'standard' },
      { path: `${paths.variable}${standardFileName}`, type: 'variable' },
    ];

    // Shuffle the array to randomize the position of the variable file
    const shuffledFileList = fileList.sort(() => Math.random() - 0.5);

    setAudioSet(shuffledFileList);
    setButtonColors(Array(shuffledFileList.length).fill(''));
    setTotalAudioFiles(shuffledFileList.length);
  };

  const hasGeneratedFileSet = useRef(false); // Ref to track if generateFileSet is called
  useEffect(() => {
    if (!hasGeneratedFileSet.current && !exitClicked) {
      generateFileSet();
      hasGeneratedFileSet.current = true; // Set flag to true after generating files
    }
  }, [selectedOptions, folderPath]);

  // Fetches audio files based on the fileset generated
  const fetchAudioFiles = async (path) => {
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

  // After audio set is ready and files are picked from the backend, play it unless currently playing
  useEffect(() => {
    if (audioSet.length > 0 && !isPlaying && !exitClicked) {
      playAudioSet();
    }
  }, [audioSet]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [audioSet]);

  // Main function to play audio set
  const playAudioSet = async () => {
    try {
      setIsPlaying(true); // Start playing

      // Play through the audio set
      for (let i = 0; i < audioSet.length; i++) {
        const { path } = audioSet[i];
        // console.log('Playing Path:', path);

        // Play the audio, wrapped in a Promise
        await new Promise((resolve) => {
          getAudio(path, async (audioUrl) => {
            if (audioUrl) {
              await playAudio(audioUrl); // Play the audio
              // console.log(`Played audio: ${audioUrl}`);
            } else {
              console.error('Audio URL not found:', path);
            }
            resolve(); // Resolve after audio is played
          });
        });

        // Wait for ISI delay between audios
        if (i < audioSet.length - 1) {
          // console.log('Waiting for', isi, 'milliseconds');
          await delay(parseInt(isi, 10));
        }
      }

      setIsPlaying(false); // Mark as not playing when done
      if (!exitClicked && !isRepeating) {
        setTotalSetsPlayed((prev) => prev + 1);
        setTotalAudioFilesPlayed((prev) => prev + 1); // Increment for the set played
      }

      if (!exitClicked && isRepeating) {
        await startDelay(); // Wait for Inter-Block Interval (IBI)
        setIsRepeating(false); // Reset repeating state
        generateFileSet(); // Generate new files for next playback
      } else if (!exitClicked && !isRepeating) {
        await startDelay(); // Wait for Inter-Block Interval (IBI)
        generateFileSet(); // Generate new files for next playback
      }
    } catch (error) {
      console.error('Error during playAudioSet:', error);
      setIsPlaying(false); // Ensure state is reset if an error occurs
    }
  };

  const playAudio = (audioUrl) => {
    return new Promise((resolve) => {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
      audioElement.onended = () => {
        resolve();
      };
      audioRef.current = audioElement;
    });
  };

  const delay = (ms) => new Promise((resolve) => {
    timeoutRef.current = setTimeout(resolve, ms);
  });

  const startDelay = async () => {
    // console.log('Delay started');
    await delay(parseInt(ibi, 10)); // Use the ibi delay (e.g., 4 seconds)
    // console.log('Delay finished');
  };

  const stopDelay = () => {
    clearTimeout(timeoutRef.current); // Clear the current timeout
    // console.log('Delay stopped');
  };

  const handleAudioClick = (index) => {
    if (isPlaying || buttonColors[index]) return;

    const selectedAudio = audioSet[index];
    const newButtonColors = [...buttonColors];

    if (selectedAudio.type === 'variable') {
      newButtonColors[index] = 'correct'; // green color for correct (variable)
      setCorrectAnswers((prev) => prev + 1);
    } else {
      newButtonColors[index] = 'wrong'; // red color for wrong (standard)
    }

    setButtonColors(newButtonColors);
  };

  const handleExitClick = () => {
    setExitClicked(true);
    setShowPopup(true);
    setIsPlaying(false);

    const finalScore = (correctAnswers / totalSetsPlayed) * 100;
    setScore(finalScore.toFixed(2));

    setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  // Handle repeat button click
  const handleRepeatClick = () => {
    if (audioSet.length > 0 && !isPlaying) {
      setIsRepeating(true); // Set repeating state
      stopDelay(); // Ensure any active delays are stopped
      setButtonColors(Array(audioSet.length).fill('')); // Reset button colors
      setIsPlaying(false); // Ensure that no audio is playing
      playAudioSet(); // Start playing audio set again
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/instruction');
  };

  return (
    <div className="test-screen">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        <h2>{sk}</h2>
        <h4>{instruction}</h4>
        <div className="audio-buttons">
          {audioSet.map((audio, index) => (
            <button
              key={index}
              className={`audio-button ${buttonColors[index]}`}
              onClick={() => handleAudioClick(index)}
              disabled={!!buttonColors[index]} // Disable button if already clicked
            >
              <FaVolumeUp className="audio-icon" />
              {index + 1}
            </button>
          ))}
        </div>
        <div className="controls">
          <button className="repeat-button" onClick={handleRepeatClick} disabled={isPlaying}>
            <FaRedo />Repeat
          </button>
        </div>
      </div>
      <button className="exit-button" onClick={handleExitClick}>Exit</button>

      {showPopup && (
        <Popup
          score={`${correctAnswers}`} // Display score as correctAnswers/totalSetsPlayed
          totalAudioPlayed={totalSetsPlayed}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default TestScreen2;
