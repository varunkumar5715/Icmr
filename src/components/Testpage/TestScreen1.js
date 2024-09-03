import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaVolumeUp, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import { getAudio } from '../../utils/AudiofileHandling';
import DataContext from '../../stores/DataContextProvider';
import Popup from '../popup/Popup';
import './TestScreen1.css';

const TestScreen1 = () => {
  const { sk, g, instruction, selectedOptions, folderPath, isi, ibi } = useContext(DataContext);
  const [audioSet, setAudioSet] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [buttonColors, setButtonColors] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [exitClicked, setExitClicked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAudioFiles, setTotalAudioFiles] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!exitClicked) {
      generateFileSet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, folderPath]);

  useEffect(() => {
    if (audioSet.length > 0 && !isPlaying && !exitClicked) {
      playAudioSet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const generateFileSet = async () => {
    const standardFolder = selectedOptions.Standard ? selectedOptions.Standard.value : '';
    const variableFolder = selectedOptions.Variable ? selectedOptions.Variable.value : '';

    const paths = {
      standard: `${folderPath}/standard/${standardFolder}/`,
      variable: `${folderPath}/variable/${variableFolder}/`,
    };

    const [standardFiles, variableFiles] = await Promise.all([
      fetchAudioFiles(paths.standard),
      fetchAudioFiles(paths.variable),
    ]);

    const pickRandomFiles = (fileList, numFiles) => {
      const selectedFiles = [];
      const fileSet = new Set();

      while (selectedFiles.length < numFiles && fileSet.size < fileList.length) {
        const fileName = fileList[Math.floor(Math.random() * fileList.length)];
        if (!fileSet.has(fileName)) {
          fileSet.add(fileName);
          selectedFiles.push(fileName);
        }
      }

      return selectedFiles;
    };

    const standardFileNames = pickRandomFiles(standardFiles, 2);
    const variableFileNames = pickRandomFiles(variableFiles, 1);

    const fileList = [
      ...standardFileNames.map(fileName => ({ path: `${paths.standard}${fileName}`, type: 'standard' })),
      ...variableFileNames.map(fileName => ({ path: `${paths.variable}${fileName}`, type: 'variable' })),
    ];

    const shuffledFileList = fileList.sort(() => Math.random() - 0.5);

    setAudioSet(shuffledFileList);
    setButtonColors(Array(shuffledFileList.length).fill(''));
    setTotalAudioFiles(shuffledFileList.length);
    setIsRepeating(false);
  };

  const playAudioSet = async () => {
    setIsPlaying(true);

    for (let i = 0; i < audioSet.length; i++) {
      const { path } = audioSet[i];
      console.log('Playing Path:', path);

      await new Promise((resolve) => {
        getAudio(path, async (audioUrl) => {
          if (audioUrl) {
            await playAudio(audioUrl);
          }
          resolve();
        });
      });

      if (i < audioSet.length - 1) {
        console.log('Waiting for', isi, 'seconds');
        await delay(parseInt(isi, 10) * 1000);
      }
    }

    setIsPlaying(false);

    if (!exitClicked && !isRepeating) {
      console.log('Waiting for IBI', ibi, 'seconds');
      await delay(parseInt(ibi, 10) * 1000);
      generateFileSet();
    }
  };

  const playAudio = (audioUrl) => {
    return new Promise((resolve) => {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
      audioElement.onended = resolve;
      audioRef.current = audioElement;
    });
  };

  const handleAudioClick = (index) => {
    if (isPlaying || buttonColors[index]) return;

    const selectedAudio = audioSet[index];
    const newButtonColors = [...buttonColors];

    if (selectedAudio.type === 'variable') {
      newButtonColors[index] = 'correct'; // green color for correct (variable)
      setCorrectAnswers(prev => prev + 1);
    } else {
      newButtonColors[index] = 'wrong'; // red color for wrong (standard)
    }

    setButtonColors(newButtonColors);
  };

  const handleExitClick = () => {
    setExitClicked(true);
    setShowPopup(true);
    setIsPlaying(false);

    const finalScore = (correctAnswers / totalAudioFiles) * 100;
    setScore(finalScore.toFixed(2));
  };

  const handleRepeatClick = () => {
    if (audioSet.length > 0 && !isPlaying) {
      setIsRepeating(true);
      setButtonColors(Array(audioSet.length).fill(''));
      playAudioSet();
    }
  };

  const closePopup = () => {
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
        console.log('showPopup', showPopup),
        <Popup message={`Score: ${correctAnswers}/${totalAudioFiles} (${score}%)`} onClose={closePopup} />
      )}
    </div>
  );
};

export default TestScreen1;




