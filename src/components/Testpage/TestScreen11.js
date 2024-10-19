// import React, { useContext, useEffect, useState, useRef } from 'react';
// import DataContext from '../../stores/DataContextProvider';
// import { useNavigate } from 'react-router-dom';
// import backendIP from '../../utils/serverData';
// import Popup from '../popup/Popup';
// import './TestScreen11.css';

// const TestScreen11 = () => {
//     const { g, sk, instruction, selectedOptions, folderPath } = useContext(DataContext);
//     const [displayScript, setDisplayScript] = useState('');
//     const [score, setScore] = useState(0);
//     const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
//     const [showPopup, setShowPopup] = useState(false);
//     const [playedFiles, setPlayedFiles] = useState([]);
//     const audioRef = useRef(new Audio());
//     const abortControllerRef = useRef(new AbortController());
//     const navigate = useNavigate();

//     const [isTestRunning, setIsTestRunning] = useState(false);
//     const [numberOfStimuli, setNumberOfStimuli] = useState(0);
//     const [stimulusDuration, setStimulusDuration] = useState(0);
//     const [responseWindow, setResponseWindow] = useState(5000);
//     const [currentStimulusIndex, setCurrentStimulusIndex] = useState(0);
//     const [duration, setDuration] = useState(0);

//     useEffect(() => {
//         console.log("Selected Options in TestScreen11:", JSON.stringify(selectedOptions, null, 2));
//         if (selectedOptions && Object.keys(selectedOptions).length > 0) {
//             const durationInMinutes = parseInt(selectedOptions['Time Duration']?.label, 10) || 0;

//             const numStimuli = parseInt(selectedOptions['Number of Stimuli']?.label, 10) || 0;
//             const responseWindowValue = selectedOptions['Response Window'] || 5000;
            
//             const totalDuration = durationInMinutes * 60; // Convert minutes to seconds
//             const intervalBetweenStimuli = totalDuration / numStimuli;
//             const calculatedStimulusDuration = Math.min(intervalBetweenStimuli, responseWindowValue / 1000); // Ensure stimulus duration doesn't exceed response window
    
//             console.log('Number of Stimuli:', numStimuli);
//             console.log('Total Duration (seconds):', totalDuration);
//             console.log('Interval Between Stimuli (seconds):', intervalBetweenStimuli);
//             console.log('Calculated Stimulus Duration (seconds):', calculatedStimulusDuration);
//             console.log('Response Window (ms):', responseWindowValue);
    
//             if (!isNaN(numStimuli) && numStimuli > 0) {
//                 setNumberOfStimuli(numStimuli);
//                 setStimulusDuration(calculatedStimulusDuration);
//                 setResponseWindow(responseWindowValue);
//                 setIsTestRunning(true);
//                 setPlayedFiles([]);
//                 setCurrentStimulusIndex(0);
//                 setDuration(totalDuration);
//             } else {
//                 console.error('Invalid Number of Stimuli:', numStimuli);
//             }
//         }
//     }, [selectedOptions]);
    

//     useEffect(() => {
//         if (folderPath && numberOfStimuli > 0) {
//             fetchSelectedAudio();
//         }

//         return () => {
//             audioRef.current.pause();
//             audioRef.current.src = '';
//             abortControllerRef.current.abort();
//         };
//     }, [folderPath, numberOfStimuli]);

//     const fetchSelectedAudio = async () => {
//         try {
//             abortControllerRef.current = new AbortController();

//             const response = await fetch(`${backendIP}/audio/listfiles`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ folderPath }),
//                 signal: abortControllerRef.current.signal,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const audioData = await response.json();

//             if (Array.isArray(audioData) && audioData.length > 0) {
//                 const shuffledAudioData = audioData.sort(() => Math.random() - 0.5);
//                 const availableFiles = shuffledAudioData.slice(0, Math.min(numberOfStimuli, shuffledAudioData.length));
//                 setPlayedFiles(availableFiles);

//                 if (availableFiles.length > 0) {
//                     playStimuli(availableFiles);
//                 } else {
//                     console.warn('No audio files available to play.');
//                 }
//             } else {
//                 console.warn('No audio files found in the folder.');
//             }
//         } catch (error) {
//             if (error.name !== 'AbortError') {
//                 console.error('Error fetching audio files:', error);
//             }
//         }
//     };

//     const playStimuli = async (fileList) => {
//         const intervalBetweenStimuli = (duration * 1000) / numberOfStimuli; // Convert to milliseconds

//         for (let i = 0; i < fileList.length; i++) {
//             setCurrentStimulusIndex(i);
//             await playAudio(fileList[i]);
//             const remainingInterval = intervalBetweenStimuli - (stimulusDuration * 1000) - responseWindow;
//             if (remainingInterval > 0) {
//                 await new Promise(resolve => setTimeout(resolve, remainingInterval));
//             }
//         }
//         setIsTestRunning(false);
//     };
//     const playAudio = async (fileName) => {
//         try {
//             audioRef.current.pause();
//             audioRef.current.src = '';
    
//             setDisplayScript(fileName.replace('.wav', ''));
//             const filenameWithPath = `${folderPath}/${fileName}`;
    
//             const response = await fetch(`${backendIP}/audio/getaudio`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ filenameWithPath }),
//                 signal: abortControllerRef.current.signal,
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
    
//             const audioBlob = await response.blob();
//             const audioUrl = URL.createObjectURL(audioBlob);
//             audioRef.current.src = audioUrl;
    
//             await audioRef.current.play();
    
//             await new Promise(resolve => {
//                 const timer = setTimeout(() => {
//                     audioRef.current.pause();
//                     resolve();
//                 }, stimulusDuration * 1000);
    
//                 audioRef.current.onended = () => {
//                     clearTimeout(timer);
//                     resolve();
//                 };
//             });
    
//             setTotalAudioPlayed(prev => prev + 1);
//             setDisplayScript('');
    
//             // Wait for the response window
//             await new Promise(resolve => setTimeout(resolve, responseWindow));
    
//         } catch (error) {
//             if (error.name !== 'AbortError') {
//                 console.error('Failed to load audio file:', error);
//             }
//         }
//     };
    

//     const handleClick = () => {
//         if (isTestRunning) {
//             setTotalAudioPlayed(prev => prev + 1);
//             // Here you can add logic to record the response time if needed
//         }
//     };

//     const handleExit = () => {
//         setShowPopup(true);
//     };

//     const handleClosePopup = () => {
//         setShowPopup(false);
//         navigate('/home');
//     };
//     return (
//         <div className="test-screen11">
//             <div className="header">
//                 <span>{g}</span>
//             </div>
//             <div className="content">
//                 <h2>{sk}</h2>
//                 <h4>{instruction}</h4>
//                 <div className="audio-icon" onClick={() => audioRef.current && audioRef.current.play()}>
//                     <span role="img" aria-label="speaker">🔊</span>
//                 </div>
//                 <h2 className="display-script">{displayScript}</h2>
//             </div>
//             <div className="button-row-index">
//                 <button className="click-button" onClick={handleClick} disabled={!isTestRunning}>
//                     Click
//                 </button>
//                 <button className="exit-button" onClick={handleExit}>Exit</button>
//             </div>
//             {showPopup && (
//                 <Popup score={score} totalAudioPlayed={totalAudioPlayed} onClose={handleClosePopup} />
//             )}
//         </div>
//     );
// };

// export default TestScreen11;




import React, { useContext, useEffect, useState, useRef } from 'react';
import DataContext from '../../stores/DataContextProvider';
import { useNavigate } from 'react-router-dom';
import backendIP from '../../utils/serverData';
import Popup from '../popup/Popup';
import './TestScreen11.css';

const TestScreen11 = () => {
    const { g, sk, instruction, selectedOptions, folderPath } = useContext(DataContext);
    const [displayScript, setDisplayScript] = useState('');
    const [score, setScore] = useState(0);
    const [totalAudioPlayed, setTotalAudioPlayed] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [playedFiles, setPlayedFiles] = useState([]);
    const audioRef = useRef(new Audio());
    const abortControllerRef = useRef(new AbortController());
    const navigate = useNavigate();

    const [isTestRunning, setIsTestRunning] = useState(false);
    const [numberOfStimuli, setNumberOfStimuli] = useState(0);
    const [stimulusDuration, setStimulusDuration] = useState(0);
    const [responseWindow, setResponseWindow] = useState(5000);
    const [duration, setDuration] = useState(0);
    const [currentStimulusIndex, setCurrentStimulusIndex] = useState(0);
    useEffect(() => {
        console.log("Selected Options in TestScreen11:", JSON.stringify(selectedOptions, null, 2));
        if (selectedOptions && Object.keys(selectedOptions).length > 0) {
            const durationInMinutes = parseInt(selectedOptions['Time Duration']?.label, 10) || 0;
            const numStimuli = parseInt(selectedOptions['Number of Stimuli']?.label, 10) || 0;
            const responseWindowValue = selectedOptions['Response Window'] || 5000;
            
            const totalDuration = durationInMinutes * 60; // Convert minutes to seconds
    
            console.log('Number of Stimuli:', numStimuli);
            console.log('Total Duration (seconds):', totalDuration);
            console.log('Response Window (ms):', responseWindowValue);
    
            if (!isNaN(numStimuli) && numStimuli > 0) {
                setNumberOfStimuli(numStimuli);
                setStimulusDuration(Math.min(responseWindowValue / 1000, 5)); // Ensure each stimulus plays for a maximum of 5 seconds
                setResponseWindow(responseWindowValue);
                setIsTestRunning(true);
                setPlayedFiles([]);
                setDuration(totalDuration);
            } else {
                console.error('Invalid Number of Stimuli:', numStimuli);
            }
        }
    }, [selectedOptions]);
    

    useEffect(() => {
        if (folderPath && numberOfStimuli > 0) {
            fetchSelectedAudio();
        }

        return () => {
            audioRef.current.pause();
            audioRef.current.src = '';
            abortControllerRef.current.abort();
        };
    }, [folderPath, numberOfStimuli]);

    const fetchSelectedAudio = async () => {
        try {
            abortControllerRef.current = new AbortController();

            const response = await fetch(`${backendIP}/audio/listfiles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folderPath }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const audioData = await response.json();

            if (Array.isArray(audioData) && audioData.length > 0) {
                const shuffledAudioData = audioData.sort(() => Math.random() - 0.5);
                const availableFiles = shuffledAudioData.slice(0, Math.min(numberOfStimuli, shuffledAudioData.length));
                setPlayedFiles(availableFiles);

                if (availableFiles.length > 0) {
                    playStimuliRandomly(availableFiles);
                } else {
                    console.warn('No audio files available to play.');
                }
            } else {
                console.warn('No audio files found in the folder.');
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching audio files:', error);
            }
        }
    };
    const playStimuliRandomly = async (fileList) => {
        const remainingTime = duration * 1000; // Total duration in milliseconds
        const intervals = generateRandomIntervals(numberOfStimuli, remainingTime);
    
        for (let i = 0; i < fileList.length; i++) {
            setCurrentStimulusIndex(i);
            await playAudio(fileList[i]);
    
            if (i < intervals.length) {
                console.log(`Time until the next audio plays: ${intervals[i] / 1000} seconds`);
                await new Promise(resolve => setTimeout(resolve, intervals[i]));
            }
        }
        setIsTestRunning(false);
    };
    

    const generateRandomIntervals = (numIntervals, maxDuration) => {
        const intervals = [];
        let totalInterval = 0;


        
        for (let i = 0; i < numIntervals - 1; i++) {
            const randomInterval = Math.random() * (maxDuration - totalInterval) / (numIntervals - i);
            intervals.push(randomInterval);
            totalInterval += randomInterval;
        }
        intervals.push(maxDuration - totalInterval); // Ensure the total time sums up to the maxDuration

        return intervals;
    };

    const playAudio = async (fileName) => {
        try {
            audioRef.current.pause();
            audioRef.current.src = '';
    
            setDisplayScript(fileName.replace('.wav', ''));
            const filenameWithPath = `${folderPath}/${fileName}`;
    
            const response = await fetch(`${backendIP}/audio/getaudio`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filenameWithPath }),
                signal: abortControllerRef.current.signal,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            audioRef.current.src = audioUrl;
    
            await audioRef.current.play();
    
            await new Promise(resolve => {
                const timer = setTimeout(() => {
                    audioRef.current.pause();
                    resolve();
                }, stimulusDuration * 1000);
    
                audioRef.current.onended = () => {
                    clearTimeout(timer);
                    resolve();
                };
            });
    
            setTotalAudioPlayed(prev => prev + 1);
            setDisplayScript('');
    
            // Wait for the response window
            await new Promise(resolve => setTimeout(resolve, responseWindow));
    
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Failed to load audio file:', error);
            }
        }
    };

    const handleClick = () => {
        if (isTestRunning) {
            setTotalAudioPlayed(prev => prev + 1);
        }
    };

    const handleExit = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/home');
    };

    return (
        <div className="test-screen11">
            <div className="header">
                <span>{g}</span>
            </div>
            <div className="content">
                <h2>{sk}</h2>
                <h4>{instruction}</h4>
                <div className="audio-icon" onClick={() => audioRef.current && audioRef.current.play()}>
                    <span role="img" aria-label="speaker">🔊</span>
                </div>
                <h2 className="display-script">{displayScript}</h2>
            </div>
            <div className="button-row-index">
                <button className="click-button" onClick={handleClick} disabled={!isTestRunning}>
                    Click
                </button>
                <button className="exit-button" onClick={handleExit}>Exit</button>
            </div>
            {showPopup && (
                <Popup score={score} totalAudioPlayed={totalAudioPlayed} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default TestScreen11;
