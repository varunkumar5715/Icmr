import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVolumeUp } from 'react-icons/fa';
import './TestScreen1.css';

const AudioFileController = {
  async getAudio(path) {
    try {
      console.log('Fetching audio from path:', path);
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      const audioURL = URL.createObjectURL(blob);
      console.log('Audio URL:', audioURL);
      return audioURL;
    } catch (error) {
      console.error('Error fetching audio:', error.message);
      return null;
    }
  }
};

const TestScreen1 = () => {
  const [audioFiles] = useState({
    1: 'eight.wav',
    2: 'eighteen.wav',
    3: 'eleven.wav'
  });
  const [clickedButton, setClickedButton] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const correctAudioId = 2; // Example of a correct answer
  const folderPath = '/audiofiles/auditory/audidisspe/durationdis/varyingdissyl';

  const handleAudioClick = async (audioId) => {
    const path = `${folderPath}/${audioFiles[audioId]}`;
    const audioUrl = await AudioFileController.getAudio(path);

    if (audioUrl) {
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
      setClickedButton(audioId);
      setIsCorrect(audioId === correctAudioId);
      console.log(`Playing audio ${audioId}`);
    } else {
      console.error('Failed to get audio URL');
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
          {Object.keys(audioFiles).map((id) => (
            <button
              key={id}
              className={`audio-button ${clickedButton === parseInt(id) ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAudioClick(parseInt(id))}
            >
              <FaVolumeUp className="audio-icon" /> 
              {id} 
            </button>
          ))}
        </div>
      </div>
      <button className="exit-button" onClick={handleExitClick}>
        Exit
      </button>
    </div>
  );
};

export default TestScreen1;
