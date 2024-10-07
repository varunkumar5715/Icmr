import React, { useContext, useEffect, useState, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import './TestScreen6.css';

const TestScreen8 = () => {
  const {
    sk, g, selectedOptions, isi, folderPath, playedScripts,
    updatePlayedScripts, totalAudioFiles, updateTotalAudioFiles
  } = useContext(DataContext);
  
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [currentFileName, setCurrentFileName] = useState('');
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const navigate = useNavigate();
  const audioRef = useRef(new Audio());
  const abortControllerRef = useRef();

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    fetchSelectedAudio();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      audioRef.current.pause();
      audioRef.current.src = ''; // Reset audio on cleanup
    };
  }, [selectedOptions]);
  

  const fetchSelectedAudio = async () => {
    try {
      const recallLevel = selectedOptions['Recall Level']?.value || selectedOptions['Recall Level']?.label || '';
      const numberOfSelections = getNumberOfSelections(recallLevel);
      updateTotalAudioFiles(numberOfSelections);
      
      if (!recallLevel) {
        console.error('Recall level is not selected');
        return;
      }

      const response = await fetch(`${backendIP}/audio/listfiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath: `${folderPath}/${recallLevel}` }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch audio files: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched Audio Files:', data);

      const randomFiles = selectRandomFiles(data, numberOfSelections);
      console.log('Random Files Selected:', randomFiles);
      
      if (randomFiles.length === 0) {
        console.error('No audio files selected. Please check your backend response.');
        return;
      }

      setSelectedFileNames(randomFiles);
      playNextAudio(randomFiles, 0); 
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Failed to fetch audio files:', error);
      }
    }
  };

  const getNumberOfSelections = (recallLevel) => {
    const levelMap = {
      'onesti': 1, 'twosti': 2, 'threesti': 3, 'foursti': 4, 'fivesti': 5,
      'sixsti': 6, 'sevensti': 7, 'eightsti': 8, 'ninesti': 9, 'tensti': 10,
      'elevensti': 11, 'twelevesti': 12, 'thirteensti': 13, 'fourteensti': 14,
      'fifteensti': 15, 'sixteensti': 16,
    };
    return levelMap[recallLevel] || 0;
  };

  const selectRandomFiles = (fileNames, count) => {
    const shuffled = fileNames.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const playNextAudio = async (fileNames, index) => {
    if (isPlaying || index >= fileNames.length || index < 0) return;

    const fileName = fileNames[index];
  
    if (!fileName) {
      console.error(`Invalid fileName at index ${index}:`, fileNames);
      return;
    }
  
    setIsPlaying(true);
    setCurrentAudioIndex(index);
    
    await playAudio(fileName);

    if (fileName) {
      updatePlayedScripts((prevScripts) => {
        const newScripts = [...prevScripts, fileName].filter(Boolean);
        console.log('Updated Played Scripts:', newScripts);
        return newScripts;
      });
    }
  
    console.log('Playing File Name:', fileName);
  setTimeout(() => {
    navigate('/testscreen9', { state: { fileName: fileName.replace('.wav', '') } });
  }, isi);
   
    setIsPlaying(false);
  };
  
  const playAudio = async (fileName) => {
    try {
      const filePath = constructFilePath(fileName);
      if (!filePath) return;

      const response = await fetch(`${backendIP}/audio/getaudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filenameWithPath: filePath }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch audio file: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current.src = audioUrl;

      await new Promise((resolve, reject) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.onerror = reject;
      });

      setCurrentFileName(fileName.replace('.wav', ''));
      await audioRef.current.play();

      await new Promise((resolve) => {
        audioRef.current.onended = resolve;
      });

      setCurrentFileName('');
    } catch (error) {
      console.error('Failed to load audio file:', error);
    }
  };

  const constructFilePath = (fileName) => {
    const recallLevel = selectedOptions['Recall Level']?.value || selectedOptions['Recall Level']?.label || '';
    if (!recallLevel) {
      console.error('Recall level not selected');
      return '';
    }
    return `${folderPath}/${recallLevel}/${fileName}`;
  };

  return (
    <div className="test-screen6">
      <div className="header">
        <span>{g}</span>
      </div>
      <div className="content">
        <h2>{sk}</h2>
        <div className="audio-icon" onClick={() => playNextAudio(selectedFileNames, currentAudioIndex)}>
          <span role="img" aria-label="speaker">🔊</span>
        </div>
        <h2 className="display-script">{currentFileName ? currentFileName : ''}</h2>
      </div>
      <div className="button-row">
        <button className="button exit" onClick={() => navigate('/home')}>Exit</button>
      </div>
    </div>
  );
};

export default TestScreen8;
