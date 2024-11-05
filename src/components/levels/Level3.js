import React, { useState, useEffect, useContext } from 'react';
import Dropdown from '../controllers/Dropdown';
import Button from '../controllers/Button';
import DataContext from '../../stores/DataContextProvider';
import './Level3.css';

// Mapping numbers to folder names
const numberToStringMap = {
  5: 'fivesti',
  10: 'tensti',
  15: 'fifteensti',
  20: 'twentysti',
  25: 'twentysti',
  30: 'thirtysti',
  35: 'thirtyfivesti',
  40: 'fourtysti',
  45: 'fourtyfivesti',
  50: 'fiftysti',
  55: 'fiftyfivesti',
  60: 'sixtysti',
  65: 'sixtyfivesti',
  70: 'seventysti',
  75: 'seventyfivesti',
  80: 'eightysti',
  85: 'eightyfivesti',
  90: 'ninetysti',
  95: 'ninetyfivesti',
  100: 'hundredsti'
};

// Define base folder paths
const baseFolderPaths = [
  "D:\\ICMR-MAIN\\backend\\audiofiles\\cognition\\cognitive\\cogniselsusatt\\cogselsus",
  "D:\\ICMR-MAIN\\backend\\audiofiles\\cognition\\cognitive\\cogniselsusatt\\cogwordsus",
  "D:\\ICMR-MAIN\\backend\\audiofiles\\cognition\\cognitive\\cogniselsusatt\\cogsentsus"
];

const Level3 = ({ onNext, onPrev, levelData }) => {
  const {
    updateSelectedOptions,
    updateDuration,
    updateNumberOfStimuli,
    updateResponseWindow,
    updateFolderPath
  } = useContext(DataContext);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [responseWindow, setResponseWindow] = useState(''); // State for Response Window
  const [selectedBaseFolderPath, setSelectedBaseFolderPath] = useState(baseFolderPaths[0]); // Default to the first path

  useEffect(() => {
    if (levelData && levelData.skillData) {
      const initialSelectedOptions = {};
      levelData.skillData.forEach(skill => {
        if (skill.type === 'dropdown') {
          initialSelectedOptions[skill.label] = skill.options[0]; // Set the default selected option
        }
      });
      setSelectedOptions(initialSelectedOptions);
    }
  }, [levelData]);

  const handleDropdownSelect = (label, value) => {
    console.log(`Selected ${label}:`, value); // Log selected value for debugging
    // Update selected options in state
    setSelectedOptions(prevState => ({
      ...prevState,
      [label]: value, // Ensure the entire selected option is used
    }));
  };
  const handleNext = () => {
    const selectedStimuli = selectedOptions["Number of Stimuli"];
    const numberOfStimuli = parseInt(selectedStimuli?.label, 10); // Use optional chaining to ensure label exists
  
    if (isNaN(numberOfStimuli) || numberOfStimuli <= 0) {
      console.log("Invalid number of stimuli selected.");
      return;
    }
  
    const folderName = numberToStringMap[numberOfStimuli] || '';
    if (!folderName) {
      console.log("No folder name found for the selected number of stimuli.");
      return;
    }
  
    const duration = parseInt(selectedOptions["Time Duration"]?.label, 10) || 5; // Default to 5 if invalid
  
    // Correctly parse Target Stimuli and Target Percentage, add logs to verify parsing
    const targetStimuli = selectedOptions["Target Stimuli"]?.label || ""; // Use default empty string if undefined
    const targetPercentage = parseFloat(selectedOptions["Target Percentage"]?.label) || 0.0;
  
    // Log to verify correct parsing
    console.log("Parsed Target Stimuli:", targetStimuli);
    console.log("Parsed Target Percentage:", targetPercentage);
  
    const responseWindowValue = parseInt(responseWindow, 10);
    if (isNaN(responseWindowValue) || responseWindowValue <= 0) {
      console.log("Invalid response window value.");
      return;
    }
  
    // Construct the folder path
    const folderPath = `${selectedBaseFolderPath}\\${folderName}`;
  
    // Log the selected options for final verification
    const updatedOptions = {
      'Time Duration': selectedOptions["Time Duration"],
      'Number of Stimuli': selectedOptions["Number of Stimuli"],
      'Response Window': responseWindowValue,
      'Target Stimuli': targetStimuli, // Ensure it correctly references parsed value
      'Target Percentage': targetPercentage
    };
  
    console.log("Selected Options:", updatedOptions); // Console log for selected options
  
    // Update the context with parsed and verified selected options
    updateSelectedOptions(updatedOptions);
    updateDuration(duration * 60000); // Convert minutes to milliseconds
    updateNumberOfStimuli(numberOfStimuli);
    updateResponseWindow(responseWindowValue);
    updateFolderPath(folderPath);
  
    onNext();
  };
  

  if (!levelData || !levelData.skillData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="level3-container">
      <div className="header-container">
        <h2>Select the options</h2>
      </div>
      <div className="content-container">
        {levelData.skillData.map((skill, index) => (
          <div key={index} className="skill-container">
            {skill.type === 'dropdown' && (
              <div className="element-container">
                <label>{skill.label}</label>
                <Dropdown
                  options={skill.options}
                  selectedOption={selectedOptions[skill.label]}
                  onSelect={(value) => handleDropdownSelect(skill.label, value)} // Pass the selected value
                />
              </div>
            )}
          </div>
        ))}
        <div className="element-container">
          <label>Response Window</label>
          <input
            type="number"
            value={responseWindow}
            onChange={(e) => setResponseWindow(e.target.value)}
            placeholder="Enter response window in ms"
            min="1"
          />
        </div>
      </div>
      <div className="button-container">
        <Button buttonName="Back" handleClick={onPrev} />
        <Button buttonName="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default Level3;
