import React, { useState, useEffect, useContext } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import DataContext from '../../stores/DataContextProvider';
import { getAudio } from '../../utils/AudiofileHandling';
import './TestScreen1.css';

const TestScreen1 = () => {
    const { selectedOptions } = useContext(DataContext);
    const [fileList, setFileList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [buttonStates, setButtonStates] = useState(['default', 'default', 'default']);

    useEffect(() => {
        generateFileSet();
    }, [selectedOptions]);

    const generateFileSet = () => {
        const standardOption = selectedOptions.Standard?.value;
        const variableOption = selectedOptions.Variable?.value;

        if (!standardOption || !variableOption) {
            console.error('Standard or Variable option is not selected');
            return;
        }

        const standardPaths = [
            `auditory/auddisspe/durationdis/varyingdissyl/standard/${standardOption}/one.wav`,
            `auditory/auddisspe/durationdis/varyingdissyl/standard/${standardOption}/two.wav`
        ];

        const variablePaths = [
            `auditory/auddisspe/durationdis/varyingdissyl/Variable/${variableOption}/one.wav`
        ];

        const combinedPaths = [...standardPaths, ...variablePaths];
        const shuffledPaths = combinedPaths.sort(() => Math.random() - 0.5);
        setFileList(shuffledPaths);

        playAudioSet(shuffledPaths);
    };

    const playAudioSet = (files) => {
        const playNext = (index) => {
            if (index >= files.length) return;

            const filePath = files[index];
            console.log(`Playing audio file: ${filePath}`);

            getAudio(filePath, (url) => {
                if (url) {
                    playAudio(url, () => {
                        setTimeout(() => playNext(index + 1), 5000); // ISI of 5 seconds
                    });
                } else {
                    console.error('Error fetching audio URL');
                    playNext(index + 1); // Move to next file on error
                }
            });
        };

        playNext(0); // Start playing from the first file
    };

    const playAudio = (url, onEndCallback) => {
        const audio = new Audio(url);
        audio.play().catch(error => console.error('Error playing audio:', error));
        audio.onended = () => {
            setIsPlaying(false);
            if (onEndCallback) onEndCallback();
        };
        setIsPlaying(true);
    };

    const handleButtonClick = (index) => {
        if (fileList.length === 0 || isPlaying) return;

        const filePath = fileList[index];
        console.log(`Button clicked for audio file: ${filePath}`);

        const newState = checkIfVariable(filePath) ? 'correct' : 'wrong';
        setButtonStates(prevState => {
            const newStates = [...prevState];
            newStates[index] = newState;
            return newStates;
        });

        setTimeout(() => {
            generateFileSet();
        }, 2000); // 2 seconds delay before re-generating file set
    };

    const checkIfVariable = (filePath) => {
        return filePath.includes('Variable');
    };

    return (
        <div className="test-screen">
            <div className="header">
                <span>Test Screen</span>
            </div>
            <div className="content">
                <h2>Audio Test</h2>
                <div className="audio-buttons">
                    {fileList.length > 0 ? (
                        fileList.map((file, index) => (
                            <button
                                key={index}
                                className={`audio-button ${buttonStates[index]}`}
                                onClick={() => handleButtonClick(index)}
                                disabled={isPlaying}
                            >
                                <FaVolumeUp className="audio-icon" />
                                {index + 1}
                            </button>
                        ))
                    ) : (
                        <p>No audio files available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestScreen1;
